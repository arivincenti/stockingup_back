import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { TicketDetail } from "./TicketDetail";

@Entity()
export class Ticket {
    // ==================================================
    // Properties
    // ==================================================
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        (type) => TicketDetail,
        (ticket_detail) => ticket_detail.ticket,
        {
            eager: true,
        }
    )
    ticket_detail: TicketDetail[];

    @OneToOne((type) => Ticket)
    @JoinColumn()
    canceled_ticket: Ticket;

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
