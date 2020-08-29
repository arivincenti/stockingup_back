import {
    Entity,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Person } from "./Person";
import { Client } from "./Client";
import { Provider } from "./Provider";

@Entity()
export class Store {
    // ==================================================
    // Properties
    // ==================================================
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    store_name: string;

    @ManyToOne((type) => User, (user) => user.stores)
    owner: User;

    @ManyToMany((type) => Person, (person) => person.stores)
    persons: Person[];

    @OneToMany((type) => Client, (client) => client.store)
    clients: Client[];

    @OneToMany((type) => Provider, (provider) => provider.store)
    providers: Provider[];

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
