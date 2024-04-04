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
