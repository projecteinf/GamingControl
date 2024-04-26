import { IErrorAPI } from "../interfaces/errorApi";

export interface ErrorGaming extends IErrorAPI {
    code: number;
    date: Date;
    title: string;
    message: string;
    stack?: string;
}