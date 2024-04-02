import { Component, NgZone, OnInit } from '@angular/core';
import { JoueursService } from "../service/joueurs.service";
import { EquipesService } from "../service/equipes.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-equipes',
  templateUrl: './equipe_ajout.component.html',
  styleUrls: ['./equipes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EquipesAjoutComponent implements OnInit {
  nomEquipe: string = ''; // Ajout du champ pour le nom de l'équipe
  typeEquipe: string = '';
  joueur1: string = '';
  joueur2: string = '';
  joueurs: any[] = [];
  messageSucces: string = '';
  joueursFiltres: any[] = [];
  afficherAlerte: boolean = false;

  constructor(private joueursService: JoueursService, private zone: NgZone, private equipesService: EquipesService) {}

  ngOnInit(): void {
    this.chargerJoueurs();
  }

  chargerJoueurs() {
    this.joueursService.getJoueurs().subscribe((joueurs: any[]) => {
      this.joueurs = joueurs;
      console.log("Joueurs chargés :", joueurs);
    });
  }

  ajouterEquipe(form: any) {
    const joueurObj1 = this.joueurs.find(joueur => joueur._id === this.joueur1);
    const joueurObj2 = this.typeEquipe === 'double' ? this.joueurs.find(joueur => joueur._id === this.joueur2) : null;
    let joueursArray = [];

    if (joueurObj1) {
      joueursArray.push({
        joueur1: joueurObj1._id
      });
    }

    if (joueurObj2) {
      joueursArray.push({
        joueur2: joueurObj2._id
      });
    }

    const equipeData = {
      nom: this.nomEquipe, // Ajout du nom de l'équipe
      type: this.typeEquipe === 'simple' ? "Simples" : "Doubles",
      joueurs: joueursArray,
    };

    this.equipesService.ajouterEquipe(equipeData).subscribe({
      next: (response) => {
        console.log(response);
        this.afficherMessage("L'équipe a été créée avec succès!");
        form.resetForm();
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
      this.joueursFiltres = this.joueurs.filter(joueur => joueur.categorie[1].niveau === joueur1.categorie[1].niveau && joueur._id !== this.joueur1 && joueur.sexe === joueur1.sexe);
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
    this.zone.run(() => {
      setTimeout(() => {
        this.afficherAlerte = false;
      }, 1000);
    });
  }
}
