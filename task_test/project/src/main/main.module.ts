import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/entites/department.entity';
import { DonationEntity } from 'src/entites/donation.entity';
import { EmployeeEntity } from 'src/entites/employee.entity';
import { RateEntity } from 'src/entites/rate.entity';
import { StatementEntity } from 'src/entites/statement.entity';
import { MainService } from './main.service';
import { MainController } from './main.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepartmentEntity,
      DonationEntity,
      EmployeeEntity,
      RateEntity,
      StatementEntity,
    ]),
  ],
  providers: [MainService],
  controllers: [MainController],
})
export class MainModule {}
