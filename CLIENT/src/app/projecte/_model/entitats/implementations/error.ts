import { IErrorGaming } from "../interfaces/error";

export interface ErrorGaming extends IErrorGaming {
    code: number;
    date: Date;
    title: string;
    message: string;
    stack?: string;
}