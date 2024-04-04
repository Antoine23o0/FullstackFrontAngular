import {Component} from '@angular/core';
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
  matchs: any[] = [];
  equipe_gagnant : any[]=[];

  constructor(private matcherService: MatchsService,private tournoisService: TournoisService) {
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
    console.log("Donnée de updateScore", match);
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

  getAllEquipeGagnant(){
    this.tournoisService.getAllMatchsGagnats().subscribe((equipesGagants: any[]) => {
      this.equipe_gagnant = equipesGagants;
      console.log("Joueurs chargés :", equipesGagants);
    });
  }



}
