import {Component, NgZone, OnInit} from '@angular/core';
import { MatchsService } from "../service/matchs.service";
import { EquipesService } from "../service/equipes.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-match-ajoute',
  templateUrl: './match_ajoute.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf]
})
export class Match_ajouteComponent implements OnInit {
  equipes: any[] = [];
  equipesFiltrees: any[] = [];
  selectedEquipe1: any;
  selectedEquipe2: any;
  matchsExistants: any[] = [];
  equipesEngagees: Set<string> = new Set();
  afficherAlerte: boolean = false;
  messageSucces: string = '';

  constructor(
    private serviceMatch: MatchsService,
    private equipeService: EquipesService,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData() {
    await this.getMatchsExistants();
    await this.getEquipes();
  }

  async getEquipes() {
    this.equipeService.getEquipe().subscribe((equipes: any[]) => {
      this.equipes = equipes.filter(equipe => !this.equipesEngagees.has(equipe._id));
      this.equipesFiltrees = [...this.equipes];
    });
  }

  getMatchsExistants() {
    this.serviceMatch.getAllMatchs().subscribe((matchs: any[]) => {
      this.matchsExistants = matchs;
      matchs.forEach(match => {
        this.equipesEngagees.add(match.equipe1Id);
        this.equipesEngagees.add(match.equipe2Id);
      });
    });
  }

  filtrerEquipes() {
    const equipe1 = this.equipes.find(equipe => equipe._id === this.selectedEquipe1);
    if (equipe1) {
      this.equipesFiltrees = this.equipes.filter(equipe =>
        equipe.type === equipe1.type &&
        equipe._id !== this.selectedEquipe1 &&
        !this.equipesEngagees.has(equipe._id));
    } else {
      this.equipesFiltrees = this.equipes.filter(equipe => !this.equipesEngagees.has(equipe._id));
    }
  }

  ajouterMatch(data: any) {
    data.score1 = 0;
    data.score2 = 0;
    const conflit = this.matchsExistants.some(match =>
      match.date === data.date && match.heure === data.heure
    );

    if (conflit) {
      console.error("Conflit de date et heure avec un match existant.");
      this.afficherMessage("Conflit de date et heure avec un match existant.");
      return;
    }

    this.serviceMatch.ajouterMatch(data).subscribe({
      next: (response) => {
        console.log("Match ajouté avec succès :", response);
        this.afficherMessage("Match a été créée avec succès!");

        // Ajout des équipes au set des équipes engagées
        this.equipesEngagees.add(data.equipe1Id);
        this.equipesEngagees.add(data.equipe2Id);

        this.matchsExistants.push(data);
        this.getEquipes();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du match :", error);
        this.afficherMessage("Erreur lors de l'ajout du match");
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
