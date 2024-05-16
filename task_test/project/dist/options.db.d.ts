import { DepartmentEntity } from "./entites/department.entity";
import { DonationEntity } from "./entites/donation.entity";
import { EmployeeEntity } from "./entites/employee.entity";
import { RateEntity } from "./entites/rate.entity";
import { StatementEntity } from "./entites/statement.entity";
export declare const options: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: (typeof EmployeeEntity | typeof DepartmentEntity | typeof DonationEntity | typeof RateEntity | typeof StatementEntity)[];
    logging: boolean;
    synchronize: boolean;
};
