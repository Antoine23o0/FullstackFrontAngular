import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JoueursService {

  constructor(private http: HttpClient) {}

  getJoueurs(): Observable<any> {
    return this.http.get('/api/joueurs/liste_joueurs');
  }

  ajouterJoueur(joueur: any): Observable<any> {
    return this.http.post('/api/joueurs/add_joueur', joueur );
  }
  ajouteJoueurDeFichier(fichier: FormData): Observable<any> {
    return this.http.put('/api/joueurs/add_fichier', fichier);
  }
  supprimer_un_joueur(id: string): Observable<any> {
    return this.http.delete('/api/joueurs/supprimer_joueur/' + id);
  }

}
