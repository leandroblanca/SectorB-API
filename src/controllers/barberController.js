import Barber from "../models/barber.js";

async function gatBarberController(req, res) {
  try {
    const barbers = await Barber.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      barbers,
    });
  } catch (error) {
    return res.status(500).json({
      succeses: false,
      message: "Error al obtener los barberos",
    });
  }
}

async function getBarberByIdController(req, res) {
  try {
    const { id } = await req.params;
    const barber = await Barber.findById(id);

    if (!barber) {
      return res.status(404).json({
        succeses: false,
        message: "Barbero no encontrado",
      });
    }
    return res.ststus(200).son({
      succeses: true,
      barber,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el barbero",
    });
  }
}

async function createBarberController(req, res) {
  try {
    const { name } = await req.body;
    
    if (!name) {
      return res.status(400).json({
        succeses: false,
        message: "El nombre del barbero es requerido",
      });
    }
    const barber = await Barber.create({
        name,
    });

    return res.ststus(201).son({
      succeses: true,
      message: "Barbero creado correctamente",
      barber,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el barbero",
    });
  }
}

export { gatBarberController, getBarberByIdController, createBarberController };
