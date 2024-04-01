import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JoueursService {

  constructor(private http: HttpClient) {} // Inject HttpClient here

  getJoueurs(): Observable<any> {
    return this.http.get('/api/joueurs/liste_joueurs');
  }

  ajouterJoueur(joueur: any): Observable<any> {
    return this.http.post('/api/joueurs/add_joueur', joueur );
  }
}
