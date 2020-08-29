import { Router } from "express";
import { ProviderController } from "../controller/ProviderController";

const providerRouter = Router();

providerRouter.get("/", ProviderController.getAll);
providerRouter.get("/:id", ProviderController.getById);
providerRouter.post("/", ProviderController.createProvider);
providerRouter.patch("/:id", ProviderController.updateProvider);
providerRouter.delete("/:id", ProviderController.deleteProvider);

export default providerRouter;
