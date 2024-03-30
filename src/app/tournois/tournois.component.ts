import {Component, inject} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {TournoisService} from "../services/tournois.service";
import {NgForOf} from "@angular/common";




@Component({
  selector: 'app-tournois',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tournois.component.html',
  styleUrl: './tournois.component.css'
})

export class TournoisComponent {
  private  tournoisService=inject(TournoisService);
  tournois: any = [];

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.afficherTournois();
  }

  afficherTournois() {
    this.tournoisService.getTournois().subscribe((tournois: any) => {
      console.log(tournois);
      this.tournois = tournois;
    });
  }

  getUserFormData(value: any) {
    console.warn()

  }

  ajouterJoueur(formData: any) {
    const tournoisData = {
      categorie: [
        {age: formData.age.toString()},
        {niveau: formData.niveau}
      ],
      nom: formData.nom,
      point: formData.point,
      prenom: formData.prenom,
      sexe: formData.sexe
    };
    console.warn(tournoisData);
    this.tournoisService.ajouterTournois(tournoisData).subscribe((reponse) => {
      console.warn(reponse);
      this.afficherTournois();
    });
  }



}
