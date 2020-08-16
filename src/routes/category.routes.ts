import { Router } from "express";
import CategoryController from "../controller/CategoryController";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getById);
categoryRouter.post("/", CategoryController.createCategory);
categoryRouter.patch("/:id", CategoryController.updateCategory);
categoryRouter.delete("/:id", CategoryController.deleteCategory);

export default categoryRouter;
