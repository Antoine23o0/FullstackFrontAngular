import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TournoisService {

  constructor(private http: HttpClient) {
  }

  getAllMatchsGagnats(): Observable<any> {
    return this.http.get('/api/tournois/equipes_gagnants');
  }

  ajouterTournoi(tournoi: any): Observable<any> {
    return this.http.post('/api/tournois/add_tournoi', tournoi);
  }

  getAllMacthsTournoi(): Observable<any> {
    return this.http.get('/api/tournois/premier_tournoi_matchs')
  }

  avancerTournoi(): Observable<any> {
    return this.http.post('/api/tournois/avancer_ronde', {});
  }



}
