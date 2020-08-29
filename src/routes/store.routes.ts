import { Router } from "express";
import { StoreController } from "../controller/StoreController";

const storeRouter = Router();

storeRouter.get("/", StoreController.getAll);
storeRouter.get("/:id", StoreController.getById);
storeRouter.post("/", StoreController.createStore);
storeRouter.patch("/:id", StoreController.updateStore);
storeRouter.delete("/:id", StoreController.deleteStore);

export default storeRouter;
