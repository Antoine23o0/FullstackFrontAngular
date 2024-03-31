import {Component, inject, NgZone, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgFor, NgIf} from "@angular/common";
import {EquipesService} from "../services/equipes.service";
import {HttpClient} from "@angular/common/http";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-equipes',
  standalone: true,
  imports: [FormsModule, NgFor,NgIf, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './equipe_liste.component.html'
})
export class EquipeListeComponent implements OnInit {
  constructor(private http: HttpClient,private zone: NgZone,private equipesService:EquipesService) {
  }

  messageSucces: string = '';
  afficherAlerte: boolean = false;

  ngOnInit(): void {
    this.afficherEquipes();
  }

  equipes: any = [];


  afficherEquipes() {
    this.equipesService.getEquipe().subscribe((equipe: any) => {
      console.log(equipe);
      this.equipes = equipe;
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

  confirmerSuppressionEquipe(equipeId: string) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?');
    if (confirmation) {
      this.supprimerEquipe(equipeId);
    }
  }

  supprimerEquipe(equipeId: string) {
    this.equipesService.supprimer_une_equipe(equipeId).subscribe({
      next: (response) => {
        this.afficherMessage('Equipe supprimé avec succès');
        this.afficherEquipes();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'équipe:', error);
      }
    });
  }
  getNiveau(joueur: any): string {
    const niveauObj = joueur.categorie.find((cat: any) => cat.niveau);
    return niveauObj ? niveauObj.niveau : 'Non spécifié';
  }
}
