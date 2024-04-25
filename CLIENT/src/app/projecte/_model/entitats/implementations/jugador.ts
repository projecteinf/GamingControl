import { Observer, throwError } from "rxjs";
import { IJugador } from "../interfaces/jugador";

export class Jugador implements IJugador {
    nom!: string;
    email!: string;
    password!: string;
    constructor() {   }

    createPlayerSentence(): string {
        return `mutation { createJugador(nom: "${this.nom}", email: "${this.email}", password: "${this.password}") { nom email password }}`;
    }
}