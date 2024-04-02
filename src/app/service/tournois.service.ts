import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TournoisService {
  constructor(private http: HttpClient) {}
  getTournois(): Observable<any> {
    return this.http.get('/api/tournois/liste_tournois');
  }

  ajouterTournois(tournoi: any): Observable<any> {
    return this.http.post('/api/tournois/add_tournoi', tournoi );
  }
}








