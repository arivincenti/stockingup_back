import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { MinLength, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Person } from "./Person";
//TODO IsEmail validation

@Entity()
@Unique(["username"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Person, (person) => person.users)
    person: Person;

    @Column()
    @MinLength(6)
    username: string;

    @Column()
    @MinLength(6)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword(): void {
        this.password = bcrypt.hashSync(this.password);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}
