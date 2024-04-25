import { Component } from '@angular/core';
import { Jugador } from '../../_model/entitats/implementations/jugador';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../../services/api.graphql';
import { Observable, Observer, Subscription, catchError, throwError } from 'rxjs';
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
    password: string = '';
    jugador?: Jugador;
    jugadors: Jugador[] = [];
    subsGetAllPlayers: Subscription | undefined;

    constructor(private graphqlService: GraphqlService) { }
    

    ngOnInit(): void {
      this.getAllPlayers()
    }

    private getAllPlayers(): void {
      const query:string = Jugador.getSentence();
      const obsGetPlayers: Observer<any> = {
        next: (response: any) => {
          if (response.data != null) this.jugadors = response.data.Jugador;
          else {
            console.error('An error occurred:', response.errors[0].message);
            throwError(() => new Error(response.errors));
          }
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
          throwError(()=> new Error('Something went wrong'));
        },
        complete: () => {
          console.log('Complete');
        }
      };
      
      this.subsGetAllPlayers = this.graphqlService.query(query).pipe(
        catchError((error: any): Observable<any> => {
          // Handle the error here if it occurs before reaching observer.error
          console.error('An error occurred before reaching observer:', error);
          // Optionally, re-throw the error or return a default value
          return throwError(() => error);
        })
      ).subscribe(obsGetPlayers);
    }
    
    ngOnDestroy(): void {
      this.subsGetAllPlayers?.unsubscribe();
    }

    onSubmit(): void {
      const mutation: string = this.nouJugador.createSentence();
      const observer: Observer<any> = {
        next: (response: any) => {
          if (response.data != null) this.jugador = response.data.createJugador;
          else {
            console.error('An error occurred:', response.errors[0].message);
            throwError(() => new Error(response.errors));
          }
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
          throwError(()=> new Error('Something went wrong'));
        },
        complete: () => {
          console.log('Complete');
        }
      };
      
      this.graphqlService.query(mutation).pipe(
        catchError((error: any): Observable<any> => {
          // Handle the error here if it occurs before reaching observer.error
          console.error('An error occurred before reaching observer:', error);
          // Optionally, re-throw the error or return a default value
          return throwError(() => error);
        })
      ).subscribe(observer);

    }

  }
