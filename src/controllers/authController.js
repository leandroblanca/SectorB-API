import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
            password: hashedPassword,
            role: "client"
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

async function loginController(req, res) {
    try {
        const {email, password} = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email o Contraseña incorrecta"
            })
        }
        const comparePassword = await bcrypt.compare(
            password,
            user.password
        )
        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: "Email o contraseña incorrecta"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )
        
        return res.status(200).json({
            success: true,
            message: "Login correcto",
            token,
            user: {
                id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en el servidor"
        })
    }
}


export {
    registerController,
    loginController
}