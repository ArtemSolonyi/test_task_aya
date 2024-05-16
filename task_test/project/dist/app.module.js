"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const department_entity_1 = require("./entites/department.entity");
const donation_entity_1 = require("./entites/donation.entity");
const employee_entity_1 = require("./entites/employee.entity");
const rate_entity_1 = require("./entites/rate.entity");
const statement_entity_1 = require("./entites/statement.entity");
const main_module_1 = require("./main/main.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            main_module_1.MainModule,
            typeorm_1.TypeOrmModule.forRoot({
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
                logging: false,
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map