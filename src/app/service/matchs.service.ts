import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchsService {
  constructor(private http: HttpClient) { }


  getAllMatchs(): Observable<any> {
    return this.http.get('/api/matchs/');
  }

  ajouterMatch(match: any): Observable<any> {
    return this.http.post('/api/matchs/', match);
  }

  modifier_scores(id: string, score1: number, score2: number): Observable<any> {
    return this.http.put('/api/matchs/' + id, { score1, score2 });
  }
  supprimer_un_match(id: string): Observable<any> {
    return this.http.delete('/api/matchs/' + id);
  }


}
