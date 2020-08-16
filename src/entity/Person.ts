import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Unique,
} from "typeorm";
import { User } from "./User";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Store } from "./Store";

@Entity()
@Unique(["email"])
export class Person {
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
}
