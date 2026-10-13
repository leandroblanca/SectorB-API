import express from "express"
import { createAppointmentController, getAppointmentByIdController, getAppointmentsController, updateAppointmentStatusController } from "../controllers/appointmentController.js"
import verificarToken from "../middlewares/authMiddleware.js";
import verificarAdmin from "../middlewares/verificarAdmin.js";
const router = express.Router()

router.post("/", verificarToken, createAppointmentController)
router.get("/",verificarToken, verificarAdmin, getAppointmentsController)
router.get("/:id", verificarToken, verificarAdmin, getAppointmentByIdController)
router.patch("/:id/status", verificarToken, verificarAdmin, updateAppointmentStatusController)

export default router;