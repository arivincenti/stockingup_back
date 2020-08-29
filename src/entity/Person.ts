import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    ManyToMany,
    OneToMany,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Store } from "./Store";
import { Client } from "./Client";

@Entity()
@Unique(["email"])
export class Person {
    // ==================================================
    // Properties
    // ==================================================
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    lastname: string;

    @Column({ type: "bigint" })
    @IsNotEmpty()
    cuit: number;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ManyToMany((type) => Store, (store) => store.persons)
    stores: Store[];

    @OneToOne((type) => Client, (client) => client.person)
    @JoinColumn()
    client: Client;

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
