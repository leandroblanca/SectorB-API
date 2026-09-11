function verificarAdmin(req, res, next) {
      console.log("🟡 ENTRE A verificarAdmin");
      console.log("USUARIO:", req.user);
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
    console.log("🟡 ES ADMIN, PASANDO AL CONTROLADOR");
    next()
}

export default verificarAdmin;