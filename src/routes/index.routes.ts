import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";
import ticketRouter from "./ticket.routes";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/users", userRouter);
routes.use("/categories", categoryRouter);
routes.use("/products", productRouter);
routes.use("/tickets", ticketRouter);

export default routes;
