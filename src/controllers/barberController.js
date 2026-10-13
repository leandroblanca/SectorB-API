import Barber from "../models/barber.js";

async function getBarberController(req, res) {
  try {
    const barbers = await Barber.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      barbers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
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
        success: false,
        message: "Barbero no encontrado",
      });
    }
    return res.status(200).json({
      success: true,
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
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "El nombre del barbero es requerido",
      });
    }
    const barber = await Barber.create({
        name,
    });

    return res.status(201).json({
      success: true,
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

async function updateBarberController(req, res) {
  try {
    const { id } = req.params;
    const barber = await Barber.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
    if (!barber) {
      return res.status(404).json({
        success: false,
        message: "Barbero no encontrado ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Barbero actualizado correctamente",
      barber
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el barbero",
    });
  }
}


async function deleteBarberController(req, res) {
  try {
    const { id } = req.params;
    const barber = await Barber.findByIdAndDelete(id)
    if (!barber) {
      return res.status(404).json({
        success: false,
        message: "Barbero no encontrado ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Barbero eliminado correctamente"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el barbero",
    });
  }
}

export { getBarberController, getBarberByIdController, createBarberController, updateBarberController, deleteBarberController};
