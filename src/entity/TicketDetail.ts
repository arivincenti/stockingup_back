import {
    Entity,
    OneToOne,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
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

    @ManyToOne((type) => Product, (product) => product.ticket_details, {
        eager: true,
    })
    product: Product;

    @Column()
    product_name: string;

    @Column()
    product_description: string;

    @Column({ type: "bigint" })
    product_code: number;

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
