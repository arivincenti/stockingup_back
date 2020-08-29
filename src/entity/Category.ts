import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Product } from "./Product";
import { Heading } from "./Heading";

@Entity()
export class Category {
    // ==================================================
    // Properties
    // ==================================================
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_name: string;

    @ManyToMany((type) => Product, (product) => product.categories)
    products: Product[];

    @ManyToMany((type) => Heading, (heading) => heading.categories)
    headings: Heading[];

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
