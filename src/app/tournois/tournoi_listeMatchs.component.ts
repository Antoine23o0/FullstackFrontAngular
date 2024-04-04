import { Component } from '@angular/core';
import { TournoisService } from "../service/tournois.service";
import { MatchsService } from "../service/matchs.service";
import { FormsModule } from "@angular/forms";
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois_liste_match.component.html',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgIf,
    NgFor,
    RouterLink,
    RouterOutlet
  ],
  styleUrls: ['./tournois.component.css']
})
export class TournoisListeMatchsComponent {
  matchs: any[] = [];
  equipe_gagnant: any[] = [];

  constructor(private matchService: MatchsService, private tournoisService: TournoisService) {
    this.getMatchs();
  }

  getMatchs() {
    this.tournoisService.getAllMacthsTournoi().subscribe({
      next: (matchs) => {
        this.matchs = matchs;
        console.log("Matchs chargés :", matchs);
      },
      error: (error) => console.error("Erreur lors du chargement des matchs :", error)
    });
  }

  updateScore(index: number, score1: number, score2: number) {
    const match = this.matchs[index];
    this.matchService.modifier_scores(match._id, score1, score2).subscribe({
      next: (updatedMatch) => {
        console.log('Score updated successfully', updatedMatch);
        // Optionnellement, rafraîchir la liste des matchs ici si nécessaire
      },
      error: (error) => console.error('Error updating score', error)
    });
  }

  getAllEquipeGagnant() {
    this.tournoisService.getAllMatchsGagnats().subscribe({
      next: (equipesGagants) => {
        this.equipe_gagnant = equipesGagants;
        console.log("Équipes gagnantes chargées :", equipesGagants);
      },
      error: (error) => console.error("Erreur lors du chargement des équipes gagnantes :", error)
    });
  }
  avancerRonde() {
    this.tournoisService.avancerTournoi().subscribe({
      next: (response) => {
        console.log('La ronde a été avancée avec succès.', response);
        this.getMatchs();
      },
      error: (error) => {
        console.error('Erreur lors de l’avancement de la ronde.', error);
      }
    });
  }



}
