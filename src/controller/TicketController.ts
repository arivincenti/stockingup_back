import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { Ticket } from "../entity/Ticket";
import { TicketDetail } from "../entity/TicketDetail";
import { Product } from "../entity/Product";

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
        const { products } = req.body;

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        queryRunner.startTransaction();

        try {
            const ticket = new Ticket();
            await queryRunner.manager.save(ticket);

            for (let i = 0; i < products.length; i++) {
                let ticketDetail = new TicketDetail();
                ticketDetail.ticket = ticket;
                ticketDetail.product_name = products[i].product_name;
                ticketDetail.product_description = products[i].description;
                ticketDetail.product_code = products[i].code;
                ticketDetail.cuantity = 1;
                ticketDetail.price = products[i].price;
                ticketDetail.product = { ...products[i] };
                ticketDetail.sub_total = products[i].price;

                await queryRunner.manager.save(ticketDetail);
            }

            await queryRunner.commitTransaction();
            res.json({ result: ticket });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            res.status(500).json({ message: "No se pudo generar el ticket" });
        } finally {
            await queryRunner.release();
        }
    };
    // ==================================================
    // Delete ticket
    // ==================================================
    static deleteTicket = async (req: Request, res: Response) => {};
}

export default TicketController;
