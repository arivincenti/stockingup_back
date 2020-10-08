import { Router } from "express";
import accountRouter from "./account.routes";
import userRouter from "./user.routes";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";
import ticketRouter from "./ticket.routes";
import headingRouter from "./heading.routes";
import personRouter from "./person.routes";
import clientRouter from "./client.routes";
import employeeRouter from "./employee.routes";
import providerRouter from "./provider.routes";
import storeRouter from "./store.routes";

const routes = Router();

routes.use("/account", accountRouter);
routes.use("/users", userRouter);
routes.use("/persons", personRouter);
routes.use("/employees", employeeRouter);
routes.use("/clients", clientRouter);
routes.use("/providers", providerRouter);
routes.use("/headings", headingRouter);
routes.use("/categories", categoryRouter);
routes.use("/products", productRouter);
routes.use("/store", storeRouter);
routes.use("/tickets", ticketRouter);

export default routes;
