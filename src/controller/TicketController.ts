import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Ticket } from "../entity/Ticket";

export class TicketController {
    // ==================================================
    // Get all tickets
    // ==================================================
    static getAll = async (req: Request, res: Response) => {
        const ticketRepository = getRepository(Ticket);

        try {
            const tickets = await ticketRepository.find();
            res.json({ count: tickets.length, results: tickets });
        } catch (error) {
            res.status(500).json({ message: "Error al buscar los tickets" });
        }
    };
    // ==================================================
    // Get ticket by ID
    // ==================================================
    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const ticketRepository = getRepository(Ticket);

        try {
            const tickets = await ticketRepository.findOneOrFail(id);
            res.json({ results: tickets });
        } catch (error) {
            res.status(500).json({ message: "Error al buscar el ticket" });
        }
    };
    // ==================================================
    // Create new ticket
    // ==================================================
    static createTicket = async (req: Request, res: Response) => {
        const { products, discount } = req.body;
    };
    // ==================================================
    // Delete ticket
    // ==================================================
    static deleteTicket = async (req: Request, res: Response) => {};
}

export default TicketController;
