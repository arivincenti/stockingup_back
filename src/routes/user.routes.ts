import { Router } from "express";
import UserController from "../controller/UserController";
import { checkToken } from "../middlewares/authentication";
import { checkRole } from "../middlewares/authorization";

const userRouter = Router();

userRouter.get("/", [checkToken, checkRole], UserController.getAll);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", UserController.createUser);
userRouter.patch("/:id", UserController.updateUser);
// userRouter.delete("/:id", UserController.deleteUser);

export default userRouter;
