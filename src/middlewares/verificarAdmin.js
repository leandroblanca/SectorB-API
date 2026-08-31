function verificarAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Usuario no autenticado"
        })
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "No tienes permisos de administrador"
        })
    }
    next()
}

export default verificarAdmin;