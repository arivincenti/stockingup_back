import {
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToMany,
    JoinTable,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from "typeorm";
import { Person } from "./Person";
import { Store } from "./Store";

@Entity()
export class Provider {
    // ==================================================
    // Properties
    // ==================================================
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => Person)
    @JoinColumn()
    person: Person;

    @ManyToMany((type) => Store)
    @JoinTable()
    stores: Store[];

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
