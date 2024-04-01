import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EquipementsService {

  private http =inject(HttpClient)
  constructor() { }


  ajouterEquipement(equipement: any): Observable<any> {
    return this.http.post('/api/equipement', equipement );
  }

  getEquipement(){
    return this.http.get('/api/equipement/affiche')
  }

  updateEquipement(newEquipementData: any): Observable<any> {
    return this.http.put('/api/equipement/modifier_equipement', newEquipementData);
  }

}
