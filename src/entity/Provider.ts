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
    ManyToOne,
} from "typeorm";
import { Person } from "./Person";
import { Store } from "./Store";
import { Product } from "./Product";

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

    @ManyToOne((type) => Store, (store) => store.providers, {
        eager: true,
    })
    store: Store;

    @ManyToMany((type) => Product, (product) => product.providers, {
        eager: true,
    })
    products: Product[];

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
