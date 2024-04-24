import { IJugador } from "../interfaces/jugador";

export class Jugador implements IJugador {
    nom!: string;
    email!: string;
    password!: string;
    constructor() {   }
}