import { Component, OnInit } from '@angular/core';
import { JoueursService } from "../joueurs.service";
import { NgFor } from "@angular/common";
import { FormsModule } from "@angular/forms";
import * as Papa from 'papaparse';

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

  importerJoueurs(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      // Utilisation de Papa Parse pour parser le fichier CSV
      Papa.parse(fileReader.result as string, {
        header: true,
        skipEmptyLines: true,
        complete: (result: { data: any[]; }) => {
          console.log(result);
          result.data.forEach(joueur => {
            // Structurez votre joueur ici selon le format attendu par votre backend
            const joueurData = {
              categorie: [
                { age: joueur.age },
                { niveau: joueur.niveau }
              ],
              nom: joueur.nom,
              point: joueur.point,
              prenom: joueur.prenom,
              sexe: joueur.sexe
            };

            // Envoi du joueur au backend
            this.joueurService.ajouterJoueur(joueurData).subscribe((reponse) => {
              console.warn(reponse);
              this.loadJoueur(); // Reload joueurs after importing
            });
          });
        }
      });
    };
    fileReader.readAsText(files[0]);
  }
}
