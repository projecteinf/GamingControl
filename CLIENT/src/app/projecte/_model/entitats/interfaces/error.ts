export interface IErrorGaming extends Error {
    code: number;
    date: Date;
    title: string;
    message: string;
    stack?: string;
}