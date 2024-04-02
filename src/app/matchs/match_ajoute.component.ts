import {Component, inject, OnInit} from '@angular/core';
import {MatchsService} from "../service/matchs.service";
import {HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {JoueursService} from "../service/joueurs.service";
import {EquipesService} from "../service/equipes.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-match_ajoute',
  standalone: true,
  imports: [RouterLink, FormsModule, NgForOf],
  templateUrl: './match_ajoute.component.html',
  //styleUrl: './matchs.component.css'
})

export class Match_ajouteComponent implements OnInit {
  equipes: any[] = [];
  equipesFiltrees: any[] = [];
  selectedEquipe1: any;
  selectedEquipe2: any;
  matchsExistants: any[] = [];

  constructor(
    private serviceMatch: MatchsService,
    private equipeService: EquipesService
  ) {}

  ngOnInit(): void {
    this.getEquipes();
    this.getMatchsExistants();
  }

  getEquipes() {
    this.equipeService.getEquipe().subscribe((equipes: any[]) => {
      this.equipes = equipes;
      this.equipesFiltrees = equipes;
    });
  }

  filtrerEquipes() {
    const equipe1 = this.equipes.find(equipe => equipe._id === this.selectedEquipe1);
    if (equipe1 && equipe1.joueurs.length > 0) {
      const sexeJoueur1 = equipe1.joueurs[0].sexe;
      this.equipesFiltrees = this.equipes.filter(equipe => {
        return sexeJoueur1 && equipe._id !== this.selectedEquipe1;
      });
    } else {
      this.equipesFiltrees = this.equipes.filter(equipe => equipe._id !== this.selectedEquipe1);
    }
  }


  getMatchsExistants() {
    this.serviceMatch.getAllMatchs().subscribe((matchs: any[]) => {
      this.matchsExistants = matchs;
    });
  }

  ajouterMatch(data: any) {
    const conflit = this.matchsExistants.some(match => {
      return match.date === data.date && match.heure === data.heure;
    });
    if (conflit) {
      console.error("Conflit de date et heure avec un match existant.");
    } else {
      this.serviceMatch.ajouterMatch(data).subscribe((response) => {
        console.log("Match ajouté avec succès :", response);
      });
    }
  }
}

