"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const department_entity_1 = require("./entites/department.entity");
const donation_entity_1 = require("./entites/donation.entity");
const employee_entity_1 = require("./entites/employee.entity");
const rate_entity_1 = require("./entites/rate.entity");
const statement_entity_1 = require("./entites/statement.entity");
exports.options = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'habrpguser',
    password: 'pgpwd4habr',
    database: 'habrdb',
    entities: [
        department_entity_1.DepartmentEntity,
        donation_entity_1.DonationEntity,
        employee_entity_1.EmployeeEntity,
        rate_entity_1.RateEntity,
        statement_entity_1.StatementEntity,
    ],
    logging: true,
    synchronize: true,
};
//# sourceMappingURL=options.db.js.map