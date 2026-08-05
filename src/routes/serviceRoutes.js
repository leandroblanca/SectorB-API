import express from "express";
import CreateServiceController from "../controllers/serviceController.js";

const router = express.Router()

router.post("/", CreateServiceController)


export default router;