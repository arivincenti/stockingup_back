import {
    Entity,
    OneToOne,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Ticket } from "./Ticket";
import { Product } from "./Product";

@Entity()
export class TicketDetail {
    // ==================================================
    // Properties
    // ==================================================
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Ticket, (ticket) => ticket.ticket_detail)
    ticket: Ticket;

    @OneToOne((type) => Product)
    @JoinColumn()
    product: Product;

    @Column()
    price: number;

    @Column()
    cuantity: number;

    @Column()
    sub_total: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
    // ==================================================
    // Methods
    // ==================================================
}
