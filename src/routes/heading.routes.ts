import { Router } from "express";
import { HeadingController } from "../controller/HeadingController";

const headingRouter = Router();

headingRouter.get("/", HeadingController.getAll);
headingRouter.get("/:id", HeadingController.getById);
headingRouter.post("/", HeadingController.createHeading);
headingRouter.patch("/:id", HeadingController.updateHeading);
headingRouter.delete("/:id", HeadingController.deleteHeading);

export default headingRouter;
