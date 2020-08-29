import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Heading {
    // ==================================================
    // Properties
    // ==================================================
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    heading_name: string;

    @ManyToMany((type) => Category, (category) => category.headings, {
        cascade: true,
    })
    @JoinTable()
    categories: Category[];
    // ==================================================
    // Methods
    // ==================================================
}
