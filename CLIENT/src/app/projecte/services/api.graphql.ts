import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable( {
    providedIn: 'root'
})

export class GraphqlService {
    constructor(private http: HttpClient) {}

    query(): Observable<any> {
        const query:string = "query { Jugador { nom email password }} ";          
        return this.http.post('/graphql', { query });
    }
}
