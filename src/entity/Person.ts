import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Unique,
    OneToOne,
} from "typeorm";
import { User } from "./User";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Client } from "./Client";
import { Provider } from "./Provider";

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

    @Column()
    @IsNotEmpty()
    cuit: number;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @OneToMany((type) => User, (user) => user.person)
    users: User[];

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
