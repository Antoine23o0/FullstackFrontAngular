import { Component, OnInit } from '@angular/core';
import { JoueursService } from "../service/joueurs.service";
import { NgFor } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-joueur-ajout',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './joueur_ajout.component.html',
})
export class JoueurAjoutComponent implements OnInit {
  joueurs: any = [];

  constructor(private joueurService: JoueursService) {
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

  ajouterJoueur(formData: any) {
    const joueurData = {
      categorie: [
        { age: formData.age.toString() },
        { niveau: formData.niveau }
      ],
      nom: formData.nom,
      point: formData.point,
      prenom: formData.prenom,
      sexe: formData.sexe
    };
    console.warn(joueurData);
    this.joueurService.ajouterJoueur(joueurData).subscribe((reponse) => {
      console.warn(reponse);
      this.loadJoueur(); // Reload joueurs after adding
    });
  }
}
