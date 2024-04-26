import { Component } from '@angular/core';
import { Jugador } from '../../_model/entitats/implementations/jugador';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../../services/api.graphql';
import { Observable, Observer, Subscription, catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorAPI } from '../../_model/entitats/implementations/error';

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
    obsGetPlayers: Observer<any> | undefined;
    obsCreatePlayer: Observer<any> | undefined;
    
    constructor(private graphqlService: GraphqlService) { this._runInitializers(); }
    
    ngOnInit(): void { this._getAllPlayers(); }

    onSubmit(): void {
      const mutation: string = this.nouJugador.createSentence();
      this._createPlayer(mutation);
    }

    private _runInitializers(): void {
      // Initialize Observers
      this._initObsGetPlayers();
      this._initObsCreatePlayer();
    }

    private _initObsGetPlayers(): void {
      this.obsGetPlayers = {
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
    }

    private _initObsCreatePlayer(): void {
      this.obsCreatePlayer = {
        next: (response: any) => {
          if (response.data != null) {
            this.jugador = response.data.createJugador;
            this.nouJugador = new Jugador();
            this.password = ""
            this._getAllPlayers();
          }
          else {
            console.error('An error occurred:', response.errors[0].message);
            throwError(() => new Error(response.errors));
          }
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
          throwError(()=> new ErrorAPI(500,'Internal Server Error', 'Something went wrong', 'http://localhost:4200/jugadors', 'Not logged in'));
        },
        complete: () => {
          console.log('Complete');
        }
      };
    }

    private _getAllPlayers(): void {
      // Subscription to get all players
      const query:string = Jugador.getSentence();
      this.graphqlService.query(query).pipe(
        catchError((error: any): Observable<any> => {
          // Handle the error here if it occurs before reaching observer.error
          console.error('An error occurred before reaching observer:', error);
          // Optionally, re-throw the error or return a default value
          return throwError(()=> new ErrorAPI(500,'Internal Server Error', error.message , error.url, 'Not logged in'));
        })
      ).subscribe(this.obsGetPlayers);
    }
    
    private _createPlayer(mutation: string): void {
      // Subscription to create a player
      this.graphqlService.query(mutation).pipe(
        catchError((error: any): Observable<any> => {
          // Handle the error here if it occurs before reaching observer.error
          console.error('An error occurred before reaching observer:', error);
          // Optionally, re-throw the error or return a default value
          return throwError(() => error);
        })
      ).subscribe(this.obsCreatePlayer);
    }

  }
