import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToMany,
    JoinTable,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Person } from "./Person";
import { Store } from "./Store";

@Entity()
export class Client {
    // ==================================================
    // Properties
    // ==================================================
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => Person)
    @JoinColumn()
    person: Person;

    @ManyToOne((type) => Store, (store) => store.clients)
    store: Store;

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
