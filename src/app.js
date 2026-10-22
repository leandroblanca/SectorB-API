import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import barberRoutes from "./routes/barberRoutes.js"
import appointmentsRoutes from "./routes/appointmentsRoutes.js"
import clientRoutes from "./routes/clientRoutes.js"
const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/users", userRoutes)
app.use("/api/barbers", barberRoutes)
app.use("/api/appointments", appointmentsRoutes )
app.use("/api/clients", clientRoutes)

app.get("/", (req, res) => {
    res.send("Api funciona correctamente")
})


export default app;