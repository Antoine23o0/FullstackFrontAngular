import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TournoisService {

  constructor(private http: HttpClient) {
  }

  getAllEquipesGagnants(): Observable<any> {
    return this.http.get('/api/tournois/equipes_gagnants');
  }

  ajouterTournoi(tournoi: any): Observable<any> {
    return this.http.post('/api/tournois/', tournoi);
  }

  getAllMacthsTournoi(): Observable<any> {
    return this.http.get('/api/tournois/matchs_dans_tounoi')
  }

  avancerTournoi(): Observable<any> {
    return this.http.post('/api/tournois/avancer_ronde', {});
  }

  supprimerlePermierTournoi(): Observable<any> {
    return this.http.delete('/api/tournois/');
  }
  supprimer_un_match(id: string): Observable<any> {
    return this.http.delete('/api/matchs/' + id);
  }

}
