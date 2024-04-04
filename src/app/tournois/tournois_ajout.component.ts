import {Component, NgZone} from '@angular/core';
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
  nouveauTournoi = {
    nomTournoi: '',
    date: '',
    duree: '',
    lieu: '',
    match: []
  };

  afficherAlerte: boolean = false;
  messageSucces: string = '';

  constructor(private matcherService: MatchsService, private tournoisService: TournoisService,private zone: NgZone,) {
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
        this.afficherMessage('Tournoi créé avec succès');

      },
      error: (erreur) => {
        console.error('Erreur lors de la création du tournoi', erreur);
        this.afficherMessage('Erreur lors de la création du tournoi');
      }
    });
  }
  afficherMessage(message: string) {
    this.messageSucces = message;
    this.afficherAlerte = true;
    this.zone.run(() => {
      setTimeout(() => {
        this.afficherAlerte = false;
      }, 5000);
    });
  }
}
