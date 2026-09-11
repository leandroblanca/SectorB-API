import jwt from "jsonwebtoken";

function verificarToken(req, res, next) {
     console.log("🔵 ENTRE A verificarToken");
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No se proporciono un token",
    });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token no proporcionado",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("🔵 TOKEN CORRECTO, PASANDO AL SIGUIENTE MIDDLEWARE");
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Token invalido o expirado",
    });
  }
}

export default verificarToken;
