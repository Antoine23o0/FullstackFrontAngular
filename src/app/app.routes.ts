import { Routes } from '@angular/router';
import {JoueursComponent} from "./joueurs/joueurs.component";
import {EquipesComponent} from "./equipes/equipes.component";
import {JoueurListeComponent} from "./joueurs/joueur-liste.component";
import {JoueurAjoutComponent} from "./joueurs/joueurs_ajout.component";
import {TournoisComponent} from "./tournois/tournois.component";
import {MatchsComponent} from "./matchs/matchs.component";
import {EquipementGetComponent} from "./equipement-get/equipement-get.component";

export const routes: Routes = [
  { path: 'joueur', component: JoueursComponent, children: [
      { path: 'liste', component: JoueurListeComponent },
      { path: 'ajout', component: JoueurAjoutComponent }
    ]},
  {path: 'equipe',component : EquipesComponent},
  {path:'tournoi',component: TournoisComponent},
  {path:'matchs',component: MatchsComponent, children : [
      { path: '', component: JoueurListeComponent },
      { path: 'ajout', component: JoueurAjoutComponent }
    ]},
  {path:'equipement',component: EquipementGetComponent},


];

