import { Routes } from '@angular/router';
import {JoueursComponent} from "./joueurs/joueurs.component";
import {EquipesComponent} from "./equipes/equipes.component";
import {JoueurListeComponent} from "./joueurs/joueur-liste.component";
import {JoueurAjoutComponent} from "./joueurs/joueurs_ajout.component";
import {TournoisComponent} from "./tournois/tournois.component";
import {EquipesAjoutComponent} from "./equipes/equipe_ajout.component";
import {EquipeListeComponent} from "./equipes/equipe_liste.component";
import {MatchsComponent} from "./matchs/matchs.component";
import {Matchs_listeComponent} from "./matchs/matchs_liste.component";
import {Match_ajouteComponent} from "./matchs/match_ajoute.component";
import {EquipementGetComponent} from "./equipement/equipement-get.component";

export const routes: Routes = [
  { path: 'joueur', component: JoueursComponent, children: [
      { path: 'liste', component: JoueurListeComponent },
      { path: 'ajout', component: JoueurAjoutComponent }
    ]},
  {path: 'equipe',component : EquipesComponent ,children: [
      { path: 'liste', component: EquipeListeComponent },
      { path: 'ajout', component: EquipesAjoutComponent}
    ]},
  {path:'tournoi',component: TournoisComponent},
  {path:'matchs',component: MatchsComponent, children : [
      { path: 'liste', component: Matchs_listeComponent },
      { path: 'ajouter', component: Match_ajouteComponent }
    ]},
  {path:'equipement',component: EquipementGetComponent},
];

