import Appointment from "../models/appointment.js";
import User from "../models/user.js";
import Service from "../models/service.js";
import Barber from "../models/barber.js";

async function createAppointmentController(req, res) {
  console.log("datos recibidos", req.body)
  try {
    const { client, service, barber, date, time } = req.body;
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

    const startTime = new Date(`${date}T${time}:00`);

    if (isNaN(startTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "La fecha o la hora no son validas",
      });
    }
    const dayStart = new Date(`${date}T00:00:00`)

    const endTime = new Date(
      startTime.getTime() + serviceData.duration * 60000,
    );

    const appointments = await Appointment.find({
      barber,
      date: dayStart,
      status: {
        $nin: ["cancelled", "rejected"],
      },
    });

    for (const appointment of appointments) {
      const existingStart = new Date(
        `${appointment.date} T ${appointment.time}:00`,
      );
      const existingEnd = new Date(
        existingStart.getTime() + appointment.duration * 60000,
      );
      if (startTime < existingEnd && endTime > existingStart) {
        return res.status(409).json({
            success: false,
            message: "El barbero ya tiene un turno en ese horario"
        })
      }
    }

    const appointment = await Appointment.create({
        client,
        service,
        barber,
        date: dayStart,
        time,
        duration: serviceData.duration
    });

    return res.status(201).json({
        success: true,
        message: "Turno creado correctamente",
        appointment
    })
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
    .populate("barber", "name")
    .sort({ date: 1, time: 1})

    return res.status(200).json({
      success: true,
      appointments
    })


  } catch (error) {
      return res.status(500).json({
      success: false,
      message: "Error al obtener los turnos",
    });
  }
}


async function getAppointmentByIdController(req, res) {
  try {
    const {id} = req.params
    const appointments = await Appointment.findById(id)
    .populate("client", "name lastname")
    .populate("service", "title price duration")
    .populate("barber", "name")
    .sort({ date: 1, time: 1})

    if (!appointments) {
      return res.status(404).json({
        success: false,
        message: "Turno no encontrado"
      })
    }

    return res.status(200).json({
      success: true,
      appointments
    })


  } catch (error) {
      return res.status(500).json({
      success: false,
      message: "Error al obtener los turnos",
    });
  }
}

async function updateAppointmentStatusController(req,res) {
  try {
    const {id} = req.params
    const {status} = req.body

    const allowedStatus = [
      "pending",
      "confirmed",
      "in_progress",
      "completed",
      "cancelled",
      "rejected",
    ]

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
      success: false,
      message: "Estado de turno no valido"
      })
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      {status},
      {
        new: true,
        runValidators: true
      }
    )

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Turno no encontrado"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Estado del turno actualizado correctamente",
      appointment
    })
  } catch (error) {
      return res.status(500).json({
      success: false,
      message: "Error al actualizar el estado del turno",
    });
  }
}



export {
    createAppointmentController,
    getAppointmentsController,
    getAppointmentByIdController,
    updateAppointmentStatusController
}