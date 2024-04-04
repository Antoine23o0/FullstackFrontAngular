import { Component } from '@angular/core';
import { TournoisService } from "../service/tournois.service";
import { MatchsService } from "../service/matchs.service";
import { FormsModule } from "@angular/forms";
import { DatePipe, NgFor, NgIf } from "@angular/common";

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois_ajout.component.html',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgIf,
    NgFor
  ],
  styleUrls: ['./tournois.component.css']
})
export class TournoisAjoutComponent {
  matchs: any[] = [];
  equipe_gagnant: any[] = [];
  nouveauTournoi = {
    format: '',
    niveau: '',
    date: '',
    duree: '',
    lieu: '',
    match: []
  };

  constructor(private matcherService: MatchsService, private tournoisService: TournoisService) {
    this.getMatchs();
  }

  getMatchs() {
    this.matcherService.getAllMatchs().subscribe((matchs: any[]) => {
      this.matchs = matchs;
      console.log("Joueurs chargés :", matchs);
    });
  }

  updateScore(index: number, score1: number, score2: number) {
    const match = this.matchs[index];
    match.score1 = score1;
    match.score2 = score2;

    this.matcherService.modifier_scores(match._id, score1, score2).subscribe({
      next: (updatedMatch) => {
        console.log('Score updated successfully', updatedMatch);
      },
      error: (error) => {
        console.error('Error updating score', error);
      }
    });
  }

  getAllEquipeGagnant() {
    this.tournoisService.getAllMatchsGagnats().subscribe((equipesGagants: any[]) => {
      this.equipe_gagnant = equipesGagants;
      console.log("Équipes gagnantes chargées :", equipesGagants);
    });
  }

  creerTournoi() {
    this.tournoisService.ajouterTournoi(this.nouveauTournoi).subscribe({
      next: (tournoiCree) => {
        console.log('Tournoi créé avec succès', tournoiCree);

      },
      error: (erreur) => {
        console.error('Erreur lors de la création du tournoi', erreur);
      }
    });
  }
}
