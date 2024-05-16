import { Department} from 'src/parse.data';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DepartmentEntity implements Department {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  employeeId:number 
}
