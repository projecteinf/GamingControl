import { Component } from '@angular/core';
import { Jugador } from '../../_model/entitats/implementations/jugador';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../../services/api.graphql';
import { Observable, Observer, catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-jugadors',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jugadors.component.html',
  styleUrl: './jugadors.component.css'
})
export class JugadorsComponent {
    nouJugador: Jugador = new Jugador();
    jugador?: Jugador;
    jugadors: Jugador[] = [];
    
    constructor(private graphqlService: GraphqlService) { }


    ngOnInit(): void {
      const query:string = "query { Jugador { nom email password }} ";
      const observer: Observer<any> = {
        next: (response: any) => {
          this.jugadors = response.data.Jugador;
        },
        error: (error: any) => {
          // Handle the error here
          console.error('An error occurred:', error);
          // Optionally, re-throw the error or return a default value
          throwError(()=> new Error('Something went wrong'));
        },
        complete: () => {
          // Handle a successful completion here
          console.log('Complete');
        }
      };
      
      this.graphqlService.query(query).pipe(
        catchError((error: any): Observable<any> => {
          // Handle the error here if it occurs before reaching observer.error
          console.error('An error occurred before reaching observer:', error);
          // Optionally, re-throw the error or return a default value
          return throwError(() => error);
        })
      ).subscribe(observer);
    }


  }
