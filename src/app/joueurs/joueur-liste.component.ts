import {Component, OnInit} from '@angular/core';
import {JoueursService} from "../service/joueurs.service";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-joueur-liste',
  standalone: true,
  imports: [NgFor],
  templateUrl: './joueurs_liste.component.html',
})
export class JoueurListeComponent implements OnInit {
  joueurs: any = [];

  constructor(private joueurService: JoueursService) {}

  ngOnInit(): void {
    this.loadJoueur();
  }

  loadJoueur() {
    this.joueurService.getJoueurs().subscribe((joueurs: any) => {
      console.log(joueurs);
      this.joueurs = joueurs;
    });
  }
}
