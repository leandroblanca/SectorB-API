import { Router } from "express";

import { registerController } from "../controllers/authController.js";
import { registerValidator } from "../validators/authValidator.js";
import validationMiddleware from "../middlewares/validatorMiddleware.js";

const router = Router()

router.post("/register", registerValidator, validationMiddleware, registerController)



export default router