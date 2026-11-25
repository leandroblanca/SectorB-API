import express from "express"
import { createAppointmentController, getAppointmentByIdController, getAppointmentsController, getAvailabilityController, getMyAppointmentsController, updateAppointmentStatusController } from "../controllers/appointmentController.js"
import verificarToken from "../middlewares/authMiddleware.js";
import verificarAdmin from "../middlewares/verificarAdmin.js";
const router = express.Router()

router.post("/", verificarToken, createAppointmentController)
router.get("/",verificarToken, verificarAdmin, getAppointmentsController)
router.get("/my-appointments", verificarToken, getMyAppointmentsController)
router.get("/availability", verificarToken, getAvailabilityController)
router.get("/:id", verificarToken, verificarAdmin, getAppointmentByIdController)
router.patch("/:id/status", verificarToken, verificarAdmin, updateAppointmentStatusController)
export default router;