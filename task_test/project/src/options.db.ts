import { DepartmentEntity } from "./entites/department.entity";
import { DonationEntity } from "./entites/donation.entity";
import { EmployeeEntity } from "./entites/employee.entity";
import { RateEntity } from "./entites/rate.entity";
import { StatementEntity } from "./entites/statement.entity";

export const options = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'habrpguser',
    password: 'pgpwd4habr',
    database: 'habrdb',
    entities: [
      DepartmentEntity,
      DonationEntity,
      EmployeeEntity,
      RateEntity,
      StatementEntity,
    ],
    logging: true,
    synchronize: true,
  }