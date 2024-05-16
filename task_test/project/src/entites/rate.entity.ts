import { Rate } from "src/parse.data";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RateEntity implements Rate {
    @PrimaryGeneratedColumn()
    id:number 
    @Column()
    value: string;
    @Column()
    date: string;
    @Column()
    sign: string;
}