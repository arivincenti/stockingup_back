import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/users", userRouter);
routes.use("/categories", categoryRouter);
routes.use("/products", productRouter);

export default routes;
