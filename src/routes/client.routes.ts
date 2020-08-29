import { Router } from "express";
import { ClientController } from "../controller/ClientController";

const clientRouter = Router();

clientRouter.get("/", ClientController.getAll);
clientRouter.get("/:id", ClientController.getById);
clientRouter.post("/", ClientController.createClient);
clientRouter.patch("/:id", ClientController.updateClient);
clientRouter.delete("/:id", ClientController.deleteClient);

export default clientRouter;
