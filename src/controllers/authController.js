import User from "../models/user.js"
import bcrypt from "bcryptjs"

async function registerController(req, res) {
    try {
        const {name, lastname, email, password} = req.body
        const exists = await User.findOne({email})

        if (exists) {
            return res.status(400).json({
                message: "Este email ya existe!" 
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            lastname,
            email,
            password: hashedPassword
        })

        await user.save()

        res.status(201).json({
            message: "Usuario registrado correctamente"
        })

    } catch (error) {
            return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}


export {
    registerController
}