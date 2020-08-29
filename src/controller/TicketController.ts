import { Request, Response } from "express";
import { getRepository, getConnection, getManager } from "typeorm";
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
        const { cart } = req.body;

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        queryRunner.startTransaction();

        try {
            const ticket = new Ticket();
            await queryRunner.manager.save(ticket);

            for (let i = 0; i < cart.length; i++) {
                if (cart[i].cuantity > cart[i].product.stock) {
                    throw Error("No hay stock disponible");
                }

                //Reducimos el stock del producto
                await queryRunner.manager.decrement(
                    Product,
                    { id: cart[i].product.id },
                    "stock",
                    cart[i].cuantity
                );

                //Generamos el ticket_detail
                let ticketDetail = new TicketDetail();
                ticketDetail.ticket = ticket;
                ticketDetail.product_name = cart[i].product.product_name;
                ticketDetail.product_description = cart[i].product.description;
                ticketDetail.product_code = cart[i].product.code;
                ticketDetail.cuantity = cart[i].cuantity;
                ticketDetail.price = cart[i].product.price;
                ticketDetail.product = { ...cart[i].product };
                ticketDetail.sub_total =
                    cart[i].product.price * cart[i].cuantity;

                await queryRunner.manager.save(ticketDetail);
            }

            await queryRunner.commitTransaction();
            res.json({ result: ticket });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            res.status(500).json({
                message: "No se pudo generar el ticket",
                error,
            });
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
