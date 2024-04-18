import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable( {
    providedIn: 'root'
})

export class GraphqlService {
    private apiUrl = 'http://localhost:4000/graphql';

    constructor(private http: HttpClient) {}

    query(query:string): Observable<any> {          
        return this.http.post(this.apiUrl, { query });
    }
}
