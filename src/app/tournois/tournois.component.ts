import {Component, NgZone} from '@angular/core';
import { TournoisService } from "../service/tournois.service";
import {MatchsService} from "../service/matchs.service";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgFor, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
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
export class TournoisComponent {
  messageSucces: string = '';
  afficherAlerte: boolean = false;
  constructor(private matcherService: MatchsService,private tournoisService: TournoisService,private zone: NgZone ) {

  }
  supprimerLePremierTournoi() {
    this.tournoisService.supprimerlePermierTournoi().subscribe({
      next: (response) => {
        this.afficherMessage('Tournoi supprimé avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de tournoi:', error);
        this.afficherMessage('Erreur lors de la suppression de tournoi');
      }
    });
  }

  afficherMessage(message: string) {
    this.messageSucces = message;
    this.afficherAlerte = true;
    this.zone.run(() => {
      setTimeout(() => {
        this.afficherAlerte = false;
      }, 1000);
    });
  }






}
