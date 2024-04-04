import {Component, inject, NgZone, OnInit} from '@angular/core';
import {MatchsService} from "../service/matchs.service";
import {HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-matchs_litse',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './match_liste.component.html',
  styleUrl: './matchs.component.css'
})
export class Matchs_listeComponent implements OnInit{
  messageSucces: string = '';
  afficherAlerte: boolean = false;


  matchs: any = [];

  constructor(private http: HttpClient,private zone: NgZone , private serviceMatch: MatchsService ) {}

  ngOnInit(): void {
    this.getMatchs();
  }

  getMatchs() {
    this.serviceMatch.getAllMatchs().subscribe((matchs : any ) => {
      console.log(matchs);
      this.matchs = matchs;
    });
  }
  confirmerSuppressionMatch(equipeId: string) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette match ?');
    if (confirmation) {
      this.supprimerMatch(equipeId);
    }
  }
  supprimerMatch(equipeId: string) {
    this.serviceMatch.supprimer_un_match(equipeId).subscribe({
      next: (response) => {
        this.afficherMessage('Match supprimé avec succès');
        this.getMatchs();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'équipe:', error);
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
