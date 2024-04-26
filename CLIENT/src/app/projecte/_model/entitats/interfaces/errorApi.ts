export interface IErrorAPI extends Error {
    code: number;
    date: Date;
    category: string;
    url: string;
    user: string;

    toString(): string;
}