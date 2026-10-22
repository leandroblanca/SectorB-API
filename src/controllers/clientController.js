import mongoose from "mongoose";
import User from "../models/user.js";
import Appointment from "../models/appointment.js";


async function getClientsController(req, res) {
  try {
    const clients = await User.find({ role: "client" })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: clients.length,
      clients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los clientes",
    });
  }
}

async function getClientByIdController(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "El ID del cliente no es valido",
      });
    }
    const client = await User.findOne({
      _id: id,
      role: "client",
    }).select("-password");

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el clientes",
    });
  }
}

async function getClientDashboardController(req, res) {
  try {
    const clients = await User.find({ role: "client"})
      .select("-password")
      .sort({ createdAt: -1 });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth());

    const newClients = clients.filter(
      (client) => client.createdAt >= startOfMonth,
    ).length;

    const clientsId = clients.map((client) => client._id)

    const appointments = await Appointment.find({
        client: {$in: clientsId},
        status: "completed",
    })
    .populate("service", "title price")
    .populate("barber", "name")
    .sort({date: -1, time: -1})

    const clientsSummary = clients.map((client) => {
        const clientAppointments = appointments.filter(
            (appointment) => appointment.client?.toString() === client._id.toString()
        )
        const lastAppointment = clientAppointments[0] || null

        const totalSpent = clientAppointments.reduce(
            (total, appointment) => total + (appointment.service?.price ?? 0), 
            0,
        )
        return {
            ...client.toObject(),
            lastVisit: lastAppointment?.date ?? null,
            lastService: lastAppointment?.service?.title ?? null,
            lastBarber: lastAppointment?.barber?.name ?? null,
            totalSpent
        };
    });
    return res.status(200).json({
        success: true,
        stats: {
            totalClients:clients.length,
            newClients,
        },
        clients: clientsSummary,
    });

  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Error al obtener datos del dashboard de clientes"
    })
  }
}

export { getClientsController, getClientByIdController, getClientDashboardController };
