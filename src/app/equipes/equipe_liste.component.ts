import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgFor} from "@angular/common";
import {EquipesService} from "../services/equipes.service";
import {HttpClient} from "@angular/common/http";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-equipes',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './equipe_liste.component.html'
})
export class EquipeListeComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  messageSucces: string = '';
  afficherAlerte: boolean = false;

  ngOnInit(): void {
    this.afficherEquipes();
  }

  private equipesService = inject(EquipesService);
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
    setTimeout(() => this.afficherAlerte = false, 300);
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


}
