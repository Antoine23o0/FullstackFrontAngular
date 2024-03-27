import {Component, inject} from '@angular/core';
import {JoueursService} from "../joueurs.service";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgFor} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-joueurs',
  standalone: true,
  imports: [
    FormsModule, NgFor, RouterOutlet, RouterLink
  ],
  templateUrl: './joueurs.component.html',
  styleUrl: './joueurs.component.css'
})
export class JoueursComponent {
  private joueurService = inject(JoueursService);
  joueurs: any = [];

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.loadJoueur();
  }

  loadJoueur() {
    this.joueurService.getJoueurs().subscribe((joueurs: any) => {
      console.log(joueurs);
      this.joueurs = joueurs;
    });
  }

  getUserFormData(value: any) {
    console.warn()

  }

  ajouterJoueur(formData: any) {
    const joueurData = {
      categorie: [
        {age: formData.age.toString()},
        {niveau: formData.niveau}
      ],
      nom: formData.nom,
      point: formData.point,
      prenom: formData.prenom,
      sexe: formData.sexe
    };
    console.warn(joueurData);
    this.joueurService.ajouterJoueur(joueurData).subscribe((reponse) => {
      console.warn(reponse);
      this.loadJoueur();
    });
  }
}


