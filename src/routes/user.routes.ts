import { Router } from "express";
import UserController from "../controller/UserController";
import { checkToken, checkRole } from "../middlewares/jwt";

const router = Router();

// ==================================================
// Get all users
// ==================================================
router.get("/", [checkToken, checkRole], UserController.getAll);
// ==================================================
// Get user by ID
// ==================================================
router.get("/:id", UserController.getUserById);
// ==================================================
// Create new user
// ==================================================
router.post("/", UserController.createUser);
// ==================================================
// Update user
// ==================================================
router.patch("/:id", UserController.updateUser);
// ==================================================
// Delete user
// ==================================================
// router.delete("/:id", UserController.deleteUser);

export default router;
