import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js"
import userRouter from "./routes/userRouter.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/users", userRouter)

app.get("/", (req, res) => {
    res.send("Api funciona correctamente")
})


export default app;