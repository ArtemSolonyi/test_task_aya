import { DepartmentEntity } from 'src/entites/department.entity';
import { DonationEntity } from 'src/entites/donation.entity';
import { EmployeeEntity } from 'src/entites/employee.entity';
import { RateEntity } from 'src/entites/rate.entity';
import { StatementEntity } from 'src/entites/statement.entity';
import { Repository } from 'typeorm';
export declare class MainService {
    private employeeRepository;
    private departmentRepository;
    private donationRepository;
    private rateRepository;
    private statementRepository;
    constructor(employeeRepository: Repository<EmployeeEntity>, departmentRepository: Repository<DepartmentEntity>, donationRepository: Repository<DonationEntity>, rateRepository: Repository<RateEntity>, statementRepository: Repository<StatementEntity>);
    onModuleInit(): Promise<void>;
    private manyEntitiesToEmployye;
    private migrateDataToDb;
    private migrateRates;
    private migrateDonations;
    private migrateEmployeeInfo;
    getRewardsOfEmployeers(): Promise<any>;
}
