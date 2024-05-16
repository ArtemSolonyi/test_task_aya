import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from './entites/department.entity';
import { DonationEntity } from './entites/donation.entity';
import { EmployeeEntity } from './entites/employee.entity';
import { RateEntity } from './entites/rate.entity';
import { StatementEntity } from './entites/statement.entity';
import { MainService } from './main/main.service';
import { MainModule } from './main/main.module';

@Module({
  imports: [
    MainModule,
    TypeOrmModule.forRoot({
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
      
      logging: false,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
