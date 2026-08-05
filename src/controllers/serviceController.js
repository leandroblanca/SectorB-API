import Service from "../models/service.js"

 async function CreateServiceController(req, res) {
    try {
        const service = await Service.create(req.body);
        res.status(201).json({
            success: true,
            message: "Servicio creado correctamente",
            service
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el servicio",
            error: error.message,
        })
    }
}

export default CreateServiceController;