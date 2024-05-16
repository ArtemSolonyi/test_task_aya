import { Donation, Rate } from 'src/parse.data';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DonationEntity implements Donation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: string;
  @Column({ type: 'numeric' })
  amount: number;
  @Column()
  currency: string;
  @Column()
  employeeId:number 
}
