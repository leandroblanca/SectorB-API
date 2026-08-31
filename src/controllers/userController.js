import User from "../models/user.js";


async function getUserController(req, res) {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
    });
  }
}

async function updateUserStatusController(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "El estado debe ser active o inactive",
      });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Estado del usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el estado del usuario",
    });
  }
}
async function updateUserController(req, res) {
  try {
    const { id } = req.params;
    const { name, lastname, email, status } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }
    if (name !== undefined) {
    user.name = name;
}

if (lastname !== undefined) {
    user.lastname = lastname;
}

if (email !== undefined) {
    user.email = email;
}

if (status !== undefined) {
    user.status = status;
}
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Usuario actualizado correctamente",
      user: {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Eroor al servidor",
      error: error.message,
    });
  }
}
async function createUserContoller(req, res) {
try {
  const {name, lastname, email, password} = req.body
  if(!name || !lastname || !email || !password ){
    return res.status(401).json({
      success: false,
      message: "Debe completar los campos para crearlo."
    })
  }
  
  const user = await User.create({
    name,
    lastname,
    email,
    password,
    role: "client",
    status: "active"
  })
  return res.status(200).json({
    success: true,
    message: "Usuario creado correctamete",
    user: {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      status: user.status
    }
  })

} catch (error) {
  return res.status(500).json({
    success: false,
    message: "Error en el servidor",
    error: error.message
  })
}  
}

export { getUserController, updateUserStatusController, updateUserController, createUserContoller };
