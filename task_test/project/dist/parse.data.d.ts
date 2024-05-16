export interface Employee {
    id: number;
    name: string;
    surname: string;
}
export interface Department {
    id: string;
    name: string;
}
export interface Statement {
    id: string;
    amount: string;
    date: string;
}
export interface Donation {
    id: number;
    date: string;
    amount: number;
}
export interface Rate {
    value: string;
    date: string;
    sign: string;
}
export interface Data {
    Employee: Employee[];
    Department: Department[];
    Statement: Statement[];
    Donation?: Donation[];
}
export declare const parseData: () => Promise<{
    data: {
        [key: number]: Data | {};
    };
    rates: Rate[];
}>;
