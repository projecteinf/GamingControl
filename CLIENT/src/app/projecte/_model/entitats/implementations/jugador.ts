import { IJugador } from "../interfaces/jugador";

export class Jugador implements IJugador {
    email: string;
    password: string;
    nom: string;

    constructor(email: string, password: string, nom: string) {
        this.email = email;
        this.password = password;
        this.nom = nom;
    }
}