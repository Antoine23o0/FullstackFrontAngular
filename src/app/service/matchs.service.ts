import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchsService {
  constructor(private http: HttpClient) { }


  getAllMatchs(): Observable<any> {
    return this.http.get('/api/matchs/liste_matchs');
  }

  ajouterMatch(match: any): Observable<any> {
    return this.http.post('/api/matchs/add_match', match);
  }
}
