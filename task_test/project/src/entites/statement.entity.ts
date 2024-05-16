import { Statement } from 'src/parse.data';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class StatementEntity implements Statement {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  date: string;
  @Column()
  amount: string;
  @Column()
  employeeId:number 
}
