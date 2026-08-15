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

async function getServiceController(req, res) {
    try {
        const services = await Service.find()

        res.status(200).json({
            success: true,
            services
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener servicios"
        })
    }
}

async function getServiceByIdController(req, res) {
    try {
        const { id } = req.params;
        const service = await Service.findById(id)

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service no encontrado"
            })
        }
        return res.status(200).json({
            success: true,
            service
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error al obtener el servidor"
        })
    }
}

async function updateServiceController(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const service = await Service.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        )
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Servicio no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Servicio actualizado correctamente",
            service
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al encontrar el servicio"
        })
    }
    
}

async function deleteServiceController(req, res) {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndDelete(id)

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Servicio no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Servicio eliminado correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar al servicio"
        })
    }
}

export {
    CreateServiceController,
    getServiceController,
    getServiceByIdController,
    updateServiceController,
    deleteServiceController
};