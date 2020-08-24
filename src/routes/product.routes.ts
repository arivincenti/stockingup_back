import { Router } from "express";
import ProductController from "../controller/ProductController";

const productRouter = Router();

productRouter.get("/", ProductController.getAll);
productRouter.get("/:code", ProductController.getByCode);
productRouter.post("/", ProductController.createProduct);
productRouter.patch("/:id", ProductController.updateProduct);
productRouter.delete("/:id", ProductController.deleteProduct);

export default productRouter;
