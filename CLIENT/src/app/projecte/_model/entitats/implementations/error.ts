import { IErrorAPI } from "../interfaces/errorApi";

export class ErrorAPI implements IErrorAPI {
    code: number;
    date: Date;
    category: string;
    message: string;
    name: string;
    url: string;
    user: string;

    constructor(code: number, title: string, message: string, url: string, user: string) {
        this.name = 'ErrorAPI';
        this.code = code;
        this.date = new Date();
        this.category = title;
        this.message = message;
        this.url = url;
        this.user = user;
        this.toString();
    }

    toString(): string {
        console.log(`ErrorAPI: ${this.code} - ${this.category} - ${this.message} - ${this.url}`);
        return `${this.date}: ErrorAPI: ${this.code} ${this.user} - ${this.url} - ${this.category} - ${this.message}`;
    }
}