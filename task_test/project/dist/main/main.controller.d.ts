import { MainService } from './main.service';
export declare class MainController {
    private readonly mainService;
    constructor(mainService: MainService);
    getRewardsOfDonations(): Promise<any>;
}
