import { Component } from '@angular/core';
import { Jugador } from '../../_model/entitats/implementations/jugador';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../../services/api.graphql';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-jugadors',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jugadors.component.html',
  styleUrl: './jugadors.component.css'
})
export class JugadorsComponent {
    jugador: Jugador;
    jugadors: Jugador[] = [];
    jugadorData$?: Observable<any>;
    

    ngOnInit(): void {
      this.jugadorData$ = this.graphqlService.query();
    }

    constructor(private graphqlService: GraphqlService) {
      console.log("JugadorsComponent constructor");
      this.jugador = new Jugador("nom", "email", "password");
      this.jugadorData$?.subscribe(data => {
        console.log(data);
      });
      
    }

  }
