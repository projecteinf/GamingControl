import { Observer, throwError } from "rxjs";
import { IJugador } from "../interfaces/jugador";

export class Jugador implements IJugador {
    nom!: string;
    email!: string;
    password!: string;
    constructor() {   }

    createSentence(): string {
        return `mutation { createJugador(nom: "${this.nom}", email: "${this.email}", password: "${this.password}") { nom email password }}`;
    }

    static getSentence(): string {
        return `query { Jugador { nom email password }}`;
    }
}