import bcrypt from "bcryptjs";
import User from "../models/user.js";

const profileFields = "name lastname email createdAt updatedAt";

async function getMyProfileController(req, res) {
  try {
    const user = await User.findById(req.user.id).select(profileFields);
    if (!user) return res.status(404).json({ message: "Cuenta no encontrada" });

    return res.json({ user });
  } catch {
    return res.status(500).json({ message: "No se pudo cargar el perfil" });
  }
}

async function updateMyProfileController(req, res) {
  try {
    const { name, lastname, email,
      currentPassword = "", newPassword = "" } = req.body;

    if (![name, lastname, email, currentPassword, newPassword]
      .every((value) => typeof value === "string")) {
      return res.status(400).json({ message: "Revisá los datos del perfil" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!name.trim() || !lastname.trim() || lastname.trim().length > 101 ||
        normalizedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ) {
      return res.status(400).json({ message: "Revisá el nombre, el correo y los datos de contacto" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Cuenta no encontrada" });

    if (currentPassword || newPassword) {
      if (!currentPassword || newPassword.length < 8 || Buffer.byteLength(newPassword, "utf8") > 72) {
        return res.status(400).json({ message: "Ingresá tu contraseña actual y una nueva de al menos 8 caracteres y hasta 72 bytes" });
      }
      if (!await bcrypt.compare(currentPassword, user.password)) {
        return res.status(400).json({ message: "La contraseña actual es incorrecta" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    user.set({ name, lastname, email: normalizedEmail });
    await user.save();

    const profile = await User.findById(user._id).select(profileFields);
    return res.json({ user: profile });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Ese correo ya está en uso" });
    if (error.name === "ValidationError") return res.status(400).json({ message: "Revisá los datos del perfil" });
    return res.status(500).json({ message: "No se pudo actualizar el perfil" });
  }
}

export { getMyProfileController, updateMyProfileController };
