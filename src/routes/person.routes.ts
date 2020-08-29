import { Router } from "express";
import { PersonController } from "../controller/PersonController";

const personRouter = Router();

personRouter.get("/", PersonController.getAll);
personRouter.get("/:id", PersonController.getById);
personRouter.post("/", PersonController.createPerson);
personRouter.patch("/:id", PersonController.updatePerson);
personRouter.delete("/:id", PersonController.deletePerson);

export default personRouter;
