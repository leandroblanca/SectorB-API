import express from "express";
import  {CreateServiceController, deleteServiceController, getServiceByIdController, getServiceController, updateServiceController } from "../controllers/serviceController.js";

const router = express.Router()

router.post("/", CreateServiceController)

router.get("/", getServiceController)

router.get("/:id", getServiceByIdController)

router.put("/:id", updateServiceController)

router.delete("/:id", deleteServiceController)
export default router;