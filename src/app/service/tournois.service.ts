import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournoisService {

  constructor(private http: HttpClient) { }

  enregistrerPoint(idMatch: string, equipeId: string) {
    return this.http.put('/api/enregistrer_point/${idMatch}/${equipeId}', {});
  }

  finirMatch(idMatch: string) {
    return this.http.put('/api/finir_match/${idMatch}', {});
  }

  lancerMatch() {
    return this.http.post('/api/lancer_match', {});
  }
}
