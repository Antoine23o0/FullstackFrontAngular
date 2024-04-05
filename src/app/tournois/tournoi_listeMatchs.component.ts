import {Component, OnInit} from '@angular/core';
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
export class TournoisListeMatchsComponent implements OnInit{
  matchs: any[] = [];
  equipes_gagnants: any[] = [];
  unEquipeGagnatFinal: any = null;

  constructor(private matchService: MatchsService, private tournoisService: TournoisService) {

  }
  ngOnInit(): void {
    this.getMatchsDansTournoi();
  }

  getMatchsDansTournoi() {
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
        this.getMatchsDansTournoi(); // Rafraîchit les matchs après mise à jour
      },
      error: (error) => console.error('Error updating score', error)
    });
  }

  getAllEquipeGagnant() {
    this.tournoisService.getAllEquipesGagnants().subscribe({
      next: (equipesGagants) => {
        this.equipes_gagnants = equipesGagants;
        console.log("Équipes gagnantes chargées :", equipesGagants);
        setTimeout(() => {
          this.equipes_gagnants = []; // Vide le tableau des équipes gagnantes
          console.log("Tableau des équipes gagnantes vidé");
        }, 20000); // Attend 20 second
      },
      error: (error) => console.error("Erreur lors du chargement des équipes gagnantes :", error)
    });
  }

  avancerRonde() {
    this.tournoisService.avancerTournoi().subscribe({
      next: (response) => {
        console.log('La ronde a été avancée avec succès.', response);
        if (response.equipe_gagnante) {
          this.matchs = [];
          this.unEquipeGagnatFinal = response.equipe_gagnante;
          console.log('Équipe gagnante finale:', this.unEquipeGagnatFinal);
        } else {
          this.getMatchsDansTournoi();
        }
      },
      error: (error) => {
        console.error('Erreur lors de l’avancement de la ronde.', error);
      }
    });
  }
}
