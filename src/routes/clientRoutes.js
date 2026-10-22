import { Router } from "express";
import verificarAdmin from "../middlewares/verificarAdmin.js";
import verificarToken from "../middlewares/authMiddleware.js";
import { getClientByIdController, getClientDashboardController, getClientsController } from "../controllers/clientController.js";


const router = Router()

router.get("/", verificarToken, verificarAdmin, getClientsController)

router.get("/dashboard", verificarToken, verificarAdmin, getClientDashboardController)

router.get("/:id", verificarToken, verificarAdmin, getClientByIdController)

export default router;