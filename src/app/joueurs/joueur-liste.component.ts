import {Component, OnInit} from '@angular/core';
import {JoueursService} from "../services/joueurs.service";
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
  afficherMessage(message: string) {
    this.messageSucces = message;
    this.afficherAlerte = true;
    setTimeout(() => this.afficherAlerte = false, 3000);
  }


  confirmerSuppression(joueurId: string) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?');
    if (confirmation) {
      this.supprimerJoueur(joueurId);
    }
  }

  supprimerJoueur(joueurId: string) {
    this.joueurService.supprimer_un_joueur(joueurId).subscribe({
      next: (response) => {
        this.afficherMessage("Le joueur a été supprimé avec succès.");
        this.loadJoueur()
      },
      error: (error) => {
        console.error(error);
        this.loadJoueur()
      }
    });
  }




}
