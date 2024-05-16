"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const department_entity_1 = require("../entites/department.entity");
const donation_entity_1 = require("../entites/donation.entity");
const employee_entity_1 = require("../entites/employee.entity");
const rate_entity_1 = require("../entites/rate.entity");
const statement_entity_1 = require("../entites/statement.entity");
const main_service_1 = require("./main.service");
const main_controller_1 = require("./main.controller");
let MainModule = class MainModule {
};
exports.MainModule = MainModule;
exports.MainModule = MainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                department_entity_1.DepartmentEntity,
                donation_entity_1.DonationEntity,
                employee_entity_1.EmployeeEntity,
                rate_entity_1.RateEntity,
                statement_entity_1.StatementEntity,
            ]),
        ],
        providers: [main_service_1.MainService],
        controllers: [main_controller_1.MainController],
    })
], MainModule);
//# sourceMappingURL=main.module.js.map