import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  constructor(private http: HttpClient) {} // Inject HttpClient here

  getEquipe(): Observable<any> {
    return this.http.get('/api/equipes/liste_equipes');
  }

  ajouterEquipe(equipe: any): Observable<any> {
    return this.http.post('/api/equipes/add_equipe', equipe );
  }
}
