import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Category } from "./Category";
import { TicketDetail } from "./TicketDetail";
import { Provider } from "./Provider";

@Entity()
export class Product {
    // ==================================================
    // Properties
    // ==================================================
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_name: string;

    @Column()
    description: string;

    @Column()
    cost: number;

    @Column()
    price: number;

    @Column()
    stock: number;

    @Column({ type: "bigint" })
    code: string;

    @ManyToMany((type) => Category, (category) => category.products, {
        cascade: true,
        eager: true,
    })
    @JoinTable()
    categories: Category[];

    @ManyToMany((type) => Provider, (provider) => provider.products, {
        cascade: true,
    })
    @JoinTable()
    providers: Provider[];

    @OneToMany((type) => TicketDetail, (ticket_detail) => ticket_detail.product)
    ticket_details: TicketDetail[];

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
