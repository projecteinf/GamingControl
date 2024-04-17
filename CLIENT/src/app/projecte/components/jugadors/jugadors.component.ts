import { Component } from '@angular/core';
import { Jugador } from '../../_model/entitats/implementations/jugador';

@Component({
  selector: 'app-jugadors',
  standalone: true,
  imports: [],
  templateUrl: './jugadors.component.html',
  styleUrl: './jugadors.component.css'
})
export class JugadorsComponent {
  jugador: Jugador;

  constructor() {
    this.jugador = new Jugador('email', 'password', 'nom');
  }

}
