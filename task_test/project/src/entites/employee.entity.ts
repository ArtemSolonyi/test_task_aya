import {  Employee } from 'src/parse.data';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmployeeEntity implements Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  surname: string;
}
