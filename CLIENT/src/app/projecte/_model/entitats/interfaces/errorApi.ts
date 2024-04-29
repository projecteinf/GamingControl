export interface IErrorAPI extends Error {
    code: number;
    date: Date;
    category: string;
    message: string;
    name: string;
    url: string;
    user: string;

    toString(): string;
}