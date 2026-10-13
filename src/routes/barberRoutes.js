import express from "express"
import { createBarberController, deleteBarberController, getBarberByIdController, getBarberController, updateBarberController } from "../controllers/barberController.js"
import verificarAdmin from "../middlewares/verificarAdmin.js"
import verificarToken from "../middlewares/authMiddleware.js"
const router = express.Router()

router.get("/",verificarToken, verificarAdmin, getBarberController)
router.get("/:id",verificarToken, verificarAdmin, getBarberByIdController)
router.post("/",verificarToken, verificarAdmin, createBarberController )
router.put("/:id",verificarToken, verificarAdmin, updateBarberController)
router.delete("/:id",verificarToken, verificarAdmin, deleteBarberController)

export default router;