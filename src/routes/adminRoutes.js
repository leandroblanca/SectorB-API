import { Router } from "express";

import verificarToken from "../middlewares/authMiddleware.js";
import verificarAdmin from "../middlewares/verificarAdmin.js";
import { createAdminController } from "../controllers/adminController.js";

const router = Router()

router.post("/create-admin", verificarToken, verificarAdmin, createAdminController)

export default router;