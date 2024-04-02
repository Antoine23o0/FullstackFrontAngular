import {Component, inject, OnInit} from '@angular/core';
import {MatchsService} from "../service/matchs.service";
import {HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-matchs_litse',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './match_liste.component.html',
  styleUrl: './matchs.component.css'
})
export class Matchs_listeComponent implements OnInit{

  private serviceMatch = inject(MatchsService);

  matchs: any = [];

  //constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMatchs();
  }

  getMatchs() {
    this.serviceMatch.getAllMatchs().subscribe((joueurs : any ) => {
      console.log(joueurs);
      this.matchs = joueurs;
    });
  }
}
