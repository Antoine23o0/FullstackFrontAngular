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
  tablesDisponibles: any[] = [];
  matchsExistants: any[] = [];

  constructor(
    private serviceMatch: MatchsService,
    private equipeService: EquipesService
  ) {
  }

  ngOnInit(): void {
    this.getEquipes();
    this.getMatchsExistants();
  }

  getEquipes() {
    this.equipeService.getEquipe().subscribe((equipes: any[]) => {
      this.equipes = equipes;
    });
  }


  getMatchsExistants() {
    this.serviceMatch.getAllMatchs().subscribe((matchs: any[]) => {
      this.matchsExistants = matchs;
    });
  }

  ajouterMatch(data: any) {
    const conflit = this.matchsExistants.some(match => {
      // Vérifier s'il y a un conflit de date et d'heure
      return match.date === data.date && match.heure === data.heure;
    });

    if (conflit) {
      // Gérer le conflit (par exemple, afficher un message d'erreur)
      console.error("Conflit de date et heure avec un match existant.");
    } else {
      // Pas de conflit, ajouter le match
      this.serviceMatch.ajouterMatch(data).subscribe((response) => {
        console.log("Match ajouté avec succès :", response);
        // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
      });
    }
  }
}
