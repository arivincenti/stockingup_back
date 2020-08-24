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
    price: number;

    @Column()
    cuantity: number;

    @Column({ type: "bigint" })
    code: number;

    @ManyToMany((type) => Category, (category) => category.products, {
        cascade: true,
    })
    @JoinTable()
    categories: Category[];

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
