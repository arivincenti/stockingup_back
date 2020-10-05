import { Router } from "express";
import AuthController from "../controller/AuthController";

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/checkEmail", AuthController.checkEmail);

export default authRouter;
