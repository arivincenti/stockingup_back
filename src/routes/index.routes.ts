import { Router } from "express";
import auth from "./auth.routes";
import user from "./user.routes";
import categoryRouter from "./category.routes";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/categories", categoryRouter);

export default routes;
