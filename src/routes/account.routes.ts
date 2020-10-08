import { Router } from "express";
import AccountController from "../controller/AccountController";

const accountRouter = Router();

accountRouter.post("/login", AccountController.login);
accountRouter.post("/register", AccountController.register);
accountRouter.post("/forgot_password", AccountController.forgotPassword);
accountRouter.post("/reset_password", AccountController.resetPassword);
accountRouter.post("/activate_account", AccountController.activateAccount);
accountRouter.post(
    "/resend_activation_code",
    AccountController.resendActivationCode
);
accountRouter.post("/check_email", AccountController.checkEmail);
accountRouter.post("/check_username", AccountController.checkUsername);

export default accountRouter;
