import { Router } from "express";

import { loginController, registerController } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../validators/authValidator.js";
import validationMiddleware from "../middlewares/validatorMiddleware.js";

const router = Router()

router.post("/register", registerValidator, validationMiddleware, registerController)

router.post("/login", loginValidator, validationMiddleware, loginController)



export default router