import { Router } from "express";
import ProductController from "../controller/ProductController";

const productRouter = Router();

productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getById);
productRouter.post("/", ProductController.createProduct);
productRouter.patch("/:id", ProductController.updateProduct);
productRouter.delete("/:id", ProductController.deleteProduct);

export default productRouter;
