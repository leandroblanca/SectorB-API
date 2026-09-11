import express from "express";
import  {CreateServiceController, deleteServiceController, getServiceByIdController, getServiceController, updateServiceController } from "../controllers/serviceController.js";
import verificarAdmin from "../middlewares/verificarAdmin.js";
import verificarToken from "../middlewares/authMiddleware.js";
const router = express.Router()

router.post("/",verificarToken, verificarAdmin, CreateServiceController)

router.get("/",verificarToken, verificarAdmin, getServiceController)

router.get("/:id",verificarToken, verificarAdmin, getServiceByIdController)

router.put("/:id",verificarToken, verificarAdmin, updateServiceController)

router.delete("/:id",verificarToken, verificarAdmin, deleteServiceController)
export default router;