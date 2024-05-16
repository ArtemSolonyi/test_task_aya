import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';

@Controller()
export class MainController {
    
  constructor(private readonly mainService: MainService) {}
  @Get('/rewards-of-donations')
  getRewardsOfDonations() {
    return this.mainService.getRewardsOfEmployeers();
  }
}
