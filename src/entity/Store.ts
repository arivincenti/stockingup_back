import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    store_name: string;

    @ManyToOne((type) => User, (user) => user.stores)
    user: User;
}
