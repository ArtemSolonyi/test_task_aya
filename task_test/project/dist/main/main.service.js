"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const department_entity_1 = require("../entites/department.entity");
const donation_entity_1 = require("../entites/donation.entity");
const employee_entity_1 = require("../entites/employee.entity");
const rate_entity_1 = require("../entites/rate.entity");
const statement_entity_1 = require("../entites/statement.entity");
const parse_data_1 = require("../parse.data");
const typeorm_2 = require("typeorm");
let MainService = class MainService {
    constructor(employeeRepository, departmentRepository, donationRepository, rateRepository, statementRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.donationRepository = donationRepository;
        this.rateRepository = rateRepository;
        this.statementRepository = statementRepository;
    }
    async onModuleInit() {
        const data = await (0, parse_data_1.parseData)();
        this.migrateDataToDb(data);
    }
    async manyEntitiesToEmployye(data) {
        for (let entity of data.entities) {
            data.repository.save(data.repository.create({ employeeId: data.employerId, ...entity }));
        }
    }
    async migrateDataToDb(data) {
        this.migrateEmployeeInfo(data);
        this.migrateRates(data);
    }
    migrateRates(data) {
        data.rates.forEach((rate) => {
            this.rateRepository.save(this.rateRepository.create(rate));
        });
    }
    migrateDonations({ donations, employerId, }) {
        for (let donation in donations) {
            const splitAmount = donations[donation].amount.split(' ');
            const currency = splitAmount[1];
            const amount = +splitAmount[0];
            this.donationRepository.save(this.donationRepository.create({
                date: donations[donation].date,
                employeeId: employerId,
                currency,
                amount,
            }));
        }
    }
    async migrateEmployeeInfo(data) {
        let employeerData;
        let employeer;
        for (let i = 1; i < Object.keys(data.data).length; i++) {
            employeerData = data.data[i];
            employeer = employeerData.Employee[0];
            const employerId = (await this.employeeRepository.save(this.employeeRepository.create({
                name: employeer.name,
                surname: employeer.surname,
            }))).id;
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
    async getRewardsOfEmployeers() {
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
};
exports.MainService = MainService;
exports.MainService = MainService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.EmployeeEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.DepartmentEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(donation_entity_1.DonationEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(rate_entity_1.RateEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(statement_entity_1.StatementEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MainService);
//# sourceMappingURL=main.service.js.map