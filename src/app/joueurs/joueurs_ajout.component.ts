import { Component, OnInit } from '@angular/core';
import { JoueursService } from "../joueurs.service";
import { NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-joueur-ajout',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './joueur_ajout.component.html',
})
export class JoueurAjoutComponent implements OnInit {
  joueurs: any = [];
  fichierSelectionne: File | null = null;
  messageSucces: string = '';
  afficherAlerte: boolean = false;

  constructor(private joueurService: JoueursService, private zone: NgZone) {}

  ngOnInit(): void {
    this.loadJoueur();
  }

  loadJoueur() {
    this.joueurService.getJoueurs().subscribe((joueurs: any) => {
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
    this.joueurService.ajouterJoueur(joueurData).subscribe((reponse) => {
      this.afficherMessage('Le joueur a été ajouté avec succès.');
      this.loadJoueur();
    }, (erreur) => {
      // Gérer l'erreur ici
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
      this.loadJoueur();
    });
    this.fichierSelectionne = null; // Réinitialisez la sélection du fichier après l'importation
  }

  afficherMessage(message: string) {
    this.messageSucces = message;
    this.afficherAlerte = true;
    setTimeout(() => this.afficherAlerte = false, 3000); // Cache l'alerte après 3 secondes
  }

}
