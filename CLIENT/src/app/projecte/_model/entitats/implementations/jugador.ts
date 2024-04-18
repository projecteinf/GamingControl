import { IJugador } from "../interfaces/jugador";

export class Jugador implements IJugador {
    email!: string;
    password!: string;
    nom!: string;

    constructor() {   }
}