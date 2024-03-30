import { Component, OnInit } from '@angular/core';
import { JoueursService } from "../services/joueurs.service";
import { NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-joueur-ajout',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './joueur_ajout.component.html',
})
export class JoueurAjoutComponent {
  //joueurs: any = [];
  fichierSelectionne: File | null = null;
  messageSucces: string = '';
  afficherAlerte: boolean = false;

  constructor(private joueurService: JoueursService, private zone: NgZone) {}



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
    this.joueurService.ajouterJoueur(joueurData).subscribe((reponse) => {
      this.afficherMessage('Le joueur a été ajouté avec succès.');
    }, (erreur) => {
      this.afficherMessage('Erreur lors de l\'ajout du joueur.');
    });
  }

  importerJoueurs(event: any): void {
    this.fichierSelectionne = event.target.files[0];
  }

  executerImportation(): void {
    if (!this.fichierSelectionne) return;
    const formData: FormData = new FormData();
    formData.append('fichier', this.fichierSelectionne, this.fichierSelectionne.name);
    this.joueurService.ajouteJoueurDeFichier(formData).subscribe(reponse => {
      this.afficherMessage('Les joueurs ont été importés avec succès.');
    });
    this.fichierSelectionne = null;
  }

  afficherMessage(message: string) {
    this.messageSucces = message;
    this.afficherAlerte = true;
    setTimeout(() => this.afficherAlerte = false, 3000);
  }

}
