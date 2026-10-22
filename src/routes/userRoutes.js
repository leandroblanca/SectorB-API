import express from "express"
import verificarToken from "../middlewares/authMiddleware.js"
import { createUserContoller, getUserController, updateUserController, updateUserStatusController } from "../controllers/userController.js"
import verificarAdmin from "../middlewares/verificarAdmin.js"

const router = express.Router()

router.get("/", verificarToken, verificarAdmin, getUserController)
router.patch("/:id/status", verificarToken, verificarAdmin, updateUserStatusController)
router.patch("/:id", verificarToken, verificarAdmin, updateUserController)
router.post("/", verificarToken, verificarAdmin, createUserContoller)

export default router;