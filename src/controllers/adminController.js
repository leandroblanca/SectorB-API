import User from "../models/user.js";
import bcrypt from "bcryptjs";

async function createAdminController(req, res) {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "No tiene permisos para crear un administrador",
      });
    }
    const currentAdmin = await User.findById(req.user.id);
    

    if (
      !currentAdmin ||
      currentAdmin.role !== "admin" ||
      currentAdmin.isMainAdmin !== true
    ) {
      return res.status(403).json({
        success: false,
        message: "Solo el administrador principal puede crear administradores",
      });
    }

    const { name, lastname, email, password } = req.body;

    if (!name || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }

    if (
      typeof name !== "string" ||
      typeof lastname !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos deben ser de tipo texto",
      });
    }
    const cleanName = name.trim();
    const cleanLastName = lastname.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanLastName || !cleanEmail || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+(?: [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+)*$/;
      
    if (cleanName.length < 3 || cleanName.length > 50 || !nameRegex.test(cleanName)) {
      return res.status(400).json({
        success: false,
        message: "El nombre debe tener entre 3 y 50 caracteres y solo letras",
      });
    }
    if (
      cleanLastName.length < 3 ||
      cleanLastName.length > 50 ||
      !nameRegex.test(cleanLastName)
    ) {
      return res.status(400).json({
        success: false,
        message: "El apellido debe tener entre 3 y 50 caracteres y solo letras",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (cleanEmail.length > 100 || !emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "El formato del email no es valido",
      });
    }
    if (password.length < 8 || password.length > 50) {
        return res.status(400).json({
            success: false,
            message: "La contraseña debe tener entre 8 y 50 caracteres"
        })
    }
    
    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Este email ya esta registrado",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      name: cleanName,
      lastname: cleanLastName,
      email: cleanEmail,
      password: hashedPassword,
      role: "admin",
      isMainAdmin: false,
    });
    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Administrador creado correctamente",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        lastname: newAdmin.lastname,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el admistrador",
    });
  }
}

export { createAdminController };
