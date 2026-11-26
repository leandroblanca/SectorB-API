import Appointment from "../models/appointment.js";
import User from "../models/user.js";
import Service from "../models/service.js";
import Barber from "../models/barber.js";
import {
  appointment_duration,
  booking_time,
  getBookingDay,
} from "../utils/appointmentUtil.js";
import { getAvailableTimes } from "../services/appointmentService.js";

async function createAppointmentController(req, res) {

  try {
    const { service, barber, date, time, notes } = req.body;
    if (notes !== undefined && (typeof notes !== "string" || notes.trim().length > 500)) {
      return res.status(400).json({
        success: false,
        message: "Las notas deben ser un texto de hasta 500 caracteres",
      });
    }
    const client = req.user.role === "admin" ? req.body.client : req.user.id;
    const user = await User.findById(client);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado",
      });
    }
    const serviceData = await Service.findById(service);
    if (!serviceData) {
      return res.status(404).json({
        success: false,
        message: "Servicio no encontrado",
      });
    }

    if (!serviceData.active) {
      return res.status(400).json({
        success: false,
        message: "El servicio no esta disponible",
      });
    }
    const barberData = await Barber.findById(barber);
    if (!barberData) {
      return res.status(404).json({
        success: false,
        message: "Barbero no encontrado",
      });
    }

    if (!barberData.active) {
      return res.status(400).json({
        success: false,
        message: "El barbero no esta disponible",
      });
    }
    const dayStart = getBookingDay(date);

    if (!dayStart || !booking_time.includes(time)) {
      return res.status(400).json({
        success: false,
        message: "La fecha o el horario no son válidos",
      });
    }

    const availableTimes = await getAvailableTimes(barberData._id, dayStart);

    if (!availableTimes.includes(time)) {
      return res.status(409).json({
        success: false,
        message: "El horario seleccionado no está disponible",
      });
    }

    const appointment = await Appointment.create({
      client,
      service,
      barber,
      date: dayStart,
      time,
      duration: appointment_duration,
      notes: notes?.trim() || undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Turno creado correctamente",
      appointment,
    });
  } catch (error) {
    console.error("🔥 ERROR AL CREAR TURNO:", error);
    return res.status(500).json({
      success: false,
      message: "Error al crear el turno",
    });
  }
}

async function getAppointmentsController(req, res) {
  try {
    const appointments = await Appointment.find()
      .populate("client", "name lastname")
      .populate("service", "title price duration")
      .populate("barber", "name lastname")
      .sort({ date: 1, time: 1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los turnos",
    });
  }
}

async function getAppointmentByIdController(req, res) {
  try {
    const { id } = req.params;
    const appointments = await Appointment.findById(id)
      .populate("client", "name lastname")
      .populate("service", "title price duration")
      .populate("barber", "name lastname")
      .sort({ date: 1, time: 1 });

    if (!appointments) {
      return res.status(404).json({
        success: false,
        message: "Turno no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los turnos",
    });
  }
}

async function updateAppointmentStatusController(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "confirmed",
      "in_progress",
      "completed",
      "cancelled",
      "rejected",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Estado de turno no valido",
      });
    }

    const filter = { _id: id };
    if (status === "in_progress") {
      const today = new Date().toLocaleDateString("sv-SE", {
        timeZone: "America/Argentina/Buenos_Aires",
      });
      // The stored reservation date uses its ISO date as the calendar key.
      const start = new Date(`${today}T00:00:00Z`);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      filter.date = { $gte: start, $lt: end };
    }

    const appointment = await Appointment.findOneAndUpdate(
      filter,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!appointment && status === "in_progress" && await Appointment.exists({ _id: id })) {
      return res.status(409).json({
        success: false,
        message: "Solo podés hacer el check-in en la fecha del turno",
      });
    }

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Turno no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Estado del turno actualizado correctamente",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el estado del turno",
    });
  }
}
async function getMyAppointmentsController(req, res) {
  try {
    const appointments = await Appointment.find({
      client: req.user.id,
    })
      .populate("client", "name lastname")
      .populate("service", "title price duration")
      .populate("barber", "name lastname")
      .sort({ date: 1, time: 1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener tus turnos",
    });
  }
}
async function getAvailabilityController(req, res) {
  try {
    const { barber, date } = req.query;
    if (typeof barber !== "string" || !/^[a-f0-9]{24}$/i.test(barber)) {
      return res.status(400).json({
        success: false,
        message: "El barbero no es valido",
      });
    }
    const dayStart = getBookingDay(date);
    if (!dayStart) {
      return res.status(400).json({
        success: false,
        message: "La fecha no es valida",
      });
    }
    const barberData = await Barber.findById(barber);
    if (!barberData || !barberData.active) {
      return res.status(404).json({
        success: false,
        message: "Barbero no disponible",
      });
    }
    const availableTimes = await getAvailableTimes(barberData._id, dayStart);

    return res.status(200).json({
      success: true,
      availableTimes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al consultar los horario disponibles.",
    });
  }
}

export {
  createAppointmentController,
  getAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentStatusController,
  getMyAppointmentsController,
  getAvailabilityController
};
