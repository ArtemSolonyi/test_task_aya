import { Donation } from 'src/parse.data';
export declare class DonationEntity implements Donation {
    id: number;
    date: string;
    amount: number;
    currency: string;
    employeeId: number;
}
