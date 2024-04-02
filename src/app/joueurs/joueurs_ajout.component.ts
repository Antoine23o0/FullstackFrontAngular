import { Component} from '@angular/core';
import { JoueursService } from "../service/joueurs.service";
import { NgFor, NgIf } from "@angular/common";

import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-joueur-ajout',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './joueur_ajout.component.html',
})
export class JoueurAjoutComponent {
  fichierSelectionne: File | null = null;
  messageSucces: string = '';
  afficherAlerte: boolean = false;


  constructor(private joueurService: JoueursService) {}






  ajouterJoueur(form: any) {
    const formData = form.value;

    const joueurData = {
      categorie: [
        { age: formData.age.toString() },
        { niveau: formData.niveau }
      ],
      nom: formData.nom,
      point: 0,
      prenom: formData.prenom,
      sexe: formData.sexe
    };

    this.joueurService.ajouterJoueur(joueurData).subscribe({
      next: (reponse) => {
        this.afficherMessage('Le joueur a été ajouté avec succès.');
        form.resetForm();
      },
      error: (erreur) => {
        this.afficherMessage('Erreur lors de l\'ajout du joueur.');
      }
    });
  }

  importerJoueurs(event: any): void {
    this.fichierSelectionne = event.target.files[0];
  }

  executerImportation(fileInput: HTMLInputElement): void {
    if (!this.fichierSelectionne) return;
    const formData: FormData = new FormData();
    formData.append('fichier', this.fichierSelectionne, this.fichierSelectionne.name);

    this.joueurService.ajouteJoueurDeFichier(formData).subscribe({
      next: (reponse) => {
        this.afficherMessage('Les joueurs ont été importés avec succès.');
        this.fichierSelectionne = null;
        fileInput.value = ''; //vider  le champ de fichier
      },
      error: (erreur) => {
        console.error('Erreur lors de l’importation des joueurs:', erreur);
      }
    });
  }

  afficherMessage(message: string) {
    this.messageSucces = message;
    this.afficherAlerte = true;
    setTimeout(() => this.afficherAlerte = false, 1000);
  }

}
