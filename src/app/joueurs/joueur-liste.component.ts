import {Component, OnInit} from '@angular/core';
import {JoueursService} from "../joueurs.service";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-joueur-liste',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './joueurs_liste.component.html',
})
export class JoueurListeComponent implements OnInit {
  joueurs: any = [];
  messageSucces: string = '';
  afficherAlerte: boolean = false;


  constructor(private joueurService: JoueursService) {}

  ngOnInit(): void {
    this.loadJoueur();
  }

  loadJoueur() {
    this.joueurService.getJoueurs().subscribe((joueurs: any) => {
      console.log(joueurs);
      this.joueurs = joueurs;
    });
  }
  afficherMessage(message: string) {
    this.messageSucces = message;
    this.afficherAlerte = true;
    setTimeout(() => this.afficherAlerte = false, 3000); // Cache l'alerte après 3 secondes
  }


  supprimer_joueur_component(id: string) {
    this.joueurService.supprimer_un_joueur(id).subscribe({
      next: (reponse) => {
        console.log('Joueur supprimé avec succès', reponse);
        this.loadJoueur();
      },
      error: (erreur) => {
        console.error('Erreur lors de la suppression du joueur', erreur);
      }
    });
  }



}
