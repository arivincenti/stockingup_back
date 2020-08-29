import { Router } from "express";
import TicketController from "../controller/TicketController";

const ticketRouter = Router();

ticketRouter.get("/", TicketController.getAll);
ticketRouter.get("/:id", TicketController.getById);
ticketRouter.post("/", TicketController.createTicket);
ticketRouter.delete("/:id", TicketController.deleteTicket);

export default ticketRouter;
