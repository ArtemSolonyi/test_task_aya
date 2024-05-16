import { Injectable } from '@nestjs/common';
import { Data, parseData, Rate } from './parse.data';
import { DataSource, Repository } from 'typeorm';
import { options } from './options.db';
import { EmployeeEntity } from './entites/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entites/department.entity';
import { DonationEntity } from './entites/donation.entity';
import { RateEntity } from './entites/rate.entity';
import { StatementEntity } from './entites/statement.entity';

@Injectable()
export class AppService {

}
