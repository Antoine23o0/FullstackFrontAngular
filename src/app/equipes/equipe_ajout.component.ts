import { Component, OnInit } from '@angular/core';
import { JoueursService } from "../services/joueurs.service";
import { EquipesService } from "../services/equipes.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-equipes',
  templateUrl: './equipe_ajout.component.html',
  styleUrls: ['./equipes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EquipesAjoutComponent implements OnInit {
  typeEquipe: string = '';
  joueur1: string = '';
  joueur2: string = '';
  joueurs: any[] = [];
  messageSucces: string = '';
  joueursFiltres: any[] = [];
  afficherAlerte: boolean = false;

  constructor(private joueursService: JoueursService, private equipesService: EquipesService) {}

  ngOnInit(): void {
    this.chargerJoueurs();
  }

  chargerJoueurs() {
    this.joueursService.getJoueurs().subscribe((joueurs: any[]) => {
      this.joueurs = joueurs;
      console.log("Joueurs chargés :", joueurs);
    });
  }

  ajouterEquipe() {
    const joueurObj1 = this.joueurs.find(joueur => joueur._id === this.joueur1);
    const joueurObj2 = this.typeEquipe === 'double' ? this.joueurs.find(joueur => joueur._id === this.joueur2) : null;
    let joueursArray = [];

    if (joueurObj1) {
      joueursArray.push({
        nom: joueurObj1.prenom + " " + joueurObj1.nom,
        niveau: joueurObj1.categorie && joueurObj1.categorie.length > 0 ? joueurObj1.categorie[1].niveau : 'Niveau inconnu'
      });
    }
    if (joueurObj2) {
      joueursArray.push({
        nom: joueurObj2.prenom + " " + joueurObj2.nom,
        niveau: joueurObj2.categorie && joueurObj2.categorie.length > 0 ? joueurObj2.categorie[1].niveau : 'Niveau inconnu'
      });
    }

    const equipeData = {
      type: this.typeEquipe === 'simple' ? "Simples" : "Doubles",
      joueurs: joueursArray,
    };
    console.log(equipeData);
    this.equipesService.ajouterEquipe(equipeData).subscribe({
      next: (response) => {
        console.log(response);
        this.afficherMessage("L'équipe a été créée avec succès!");
      },
      error: (error) => {
        console.error(error);
        this.afficherMessage("Une erreur s'est produite lors de la création de l'équipe.");
      }
    });
  }

  miseAJourNiveauJoueur1() {
    const joueur1 = this.joueurs.find(joueur => joueur._id === this.joueur1);
    if (joueur1) {
      this.joueursFiltres = this.joueurs.filter(joueur => joueur.categorie[1].niveau === joueur1.categorie[1].niveau && joueur._id !== this.joueur1);
    } else {
      this.joueursFiltres = [];
    }
  }

  formulaireValide() {
    if (this.typeEquipe === 'simple') {
      return !!this.joueur1;
    } else if (this.typeEquipe === 'double') {
      return !!this.joueur1 && !!this.joueur2 && this.joueur1 !== this.joueur2;
    }
    return false;
  }

  afficherMessage(message: string) {
    this.messageSucces = message;
    this.afficherAlerte = true;
    setTimeout(() => this.afficherAlerte = false, 300);
  }





}
