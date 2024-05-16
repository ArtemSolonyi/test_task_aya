import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/entites/department.entity';
import { DonationEntity } from 'src/entites/donation.entity';
import { EmployeeEntity } from 'src/entites/employee.entity';
import { RateEntity } from 'src/entites/rate.entity';
import { StatementEntity } from 'src/entites/statement.entity';
import { parseData, Data, Rate, Employee, Donation } from 'src/parse.data';
import { Repository } from 'typeorm';

@Injectable()
export class MainService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(DonationEntity)
    private donationRepository: Repository<DonationEntity>,
    @InjectRepository(RateEntity)
    private rateRepository: Repository<RateEntity>,
    @InjectRepository(StatementEntity)
    private statementRepository: Repository<StatementEntity>,
  ) {}
  async onModuleInit() {
    const data = await parseData();
    this.migrateDataToDb(data);
  }
  private async manyEntitiesToEmployye(data: {
    repository: Repository<any>;
    entities: {}[];
    employerId: number;
  }) {
    for (let entity of data.entities) {
      data.repository.save(
        data.repository.create({ employeeId: data.employerId, ...entity }),
      );
    }
  }
  private async migrateDataToDb(data: {
    data: { [key: number]: {} | Data };
    rates: Rate[];
  }) {
    this.migrateEmployeeInfo(data);
    this.migrateRates(data);
  }

  private migrateRates(data: { rates: Rate[] }) {
    data.rates.forEach((rate) => {
      this.rateRepository.save(this.rateRepository.create(rate));
    });
  }
  private migrateDonations({
    donations,
    employerId,
  }: {
    donations: Donation[];
    employerId: number;
  }) {
    for (let donation in donations) {
      const splitAmount = (
        donations[donation].amount as unknown as string
      ).split(' ');
      const currency = splitAmount[1];
      const amount = +splitAmount[0];
      this.donationRepository.save(
        this.donationRepository.create({
          date: donations[donation].date,
          employeeId: employerId,
          currency,
          amount,
        }),
      );
    }
  }
  private async migrateEmployeeInfo(data: {
    data: { [key: number]: {} | Data };
  }) {
    let employeerData: Data;
    let employeer: Employee;

    for (let i = 1; i < Object.keys(data.data).length; i++) {
      employeerData = data.data[i] as Data;
      employeer = employeerData.Employee[0];

      const employerId = (
        await this.employeeRepository.save(
          this.employeeRepository.create({
            name: employeer.name,
            surname: employeer.surname,
          }),
        )
      ).id;
      this.migrateDonations({
        donations: employeerData?.Donation || [],
        employerId,
      });
      this.manyEntitiesToEmployye({
        repository: this.departmentRepository,
        entities: employeerData?.Department || [],
        employerId,
      });
      this.manyEntitiesToEmployye({
        repository: this.statementRepository,
        entities: employeerData?.Statement || [],
        employerId,
      });
    }
  }
  public async getRewardsOfEmployeers() {
    const result = await this.employeeRepository.query(`
    WITH donations AS (
      SELECT 
          ee.id AS employee_id,
          SUM(de.amount * CAST(re.value AS NUMERIC)) AS total_donations_usd
      FROM 
          donation_entity de
      JOIN 
          employee_entity ee ON CAST(de."employeeId" AS INTEGER) = ee.id
      JOIN 
          rate_entity re ON de.currency = re.sign AND de.date = re.date
      GROUP BY 
          ee.id
  ), 
  rewardable_donations AS (
      SELECT 
          employee_id,
          CASE 
              WHEN total_donations_usd > 100 THEN total_donations_usd
              ELSE 0 
          END AS rewardable_amount
      FROM 
          donations
  )
  SELECT 
      rd.employee_id,
      ee.name AS employee_name,
      ee.surname AS employee_surname,
      rd.rewardable_amount,
      CASE 
          WHEN rd.rewardable_amount > 0 THEN (rd.rewardable_amount / (SELECT SUM(rewardable_amount) FROM rewardable_donations)) * 10000
          ELSE 0 
      END AS one_time_reward
  FROM 
      rewardable_donations rd
  JOIN 
      employee_entity ee ON rd.employee_id = ee.id;
  `);
    return result;
  }
}
