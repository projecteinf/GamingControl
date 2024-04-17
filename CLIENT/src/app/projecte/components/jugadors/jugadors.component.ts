import { Component } from '@angular/core';
import { Jugador } from '../../_model/entitats/implementations/jugador';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jugadors',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jugadors.component.html',
  styleUrl: './jugadors.component.css'
})
export class JugadorsComponent {
  jugador: Jugador;

  constructor() {
    this.jugador = new Jugador('email', 'password', 'nom');
  }

}
