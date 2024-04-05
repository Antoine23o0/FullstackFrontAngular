import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  constructor(private http: HttpClient) {}

  getEquipe(): Observable<any> {
    return this.http.get('/api/equipes/');
  }

  ajouterEquipe(equipe: any): Observable<any> {
    return this.http.post('/api/equipes/', equipe );
  }
  supprimer_une_equipe(id: string): Observable<any> {
    return this.http.delete('/api/equipes/' + id);
  }
}
