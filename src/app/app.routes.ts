import { Routes } from '@angular/router';
import {JoueursComponent} from "./joueurs/joueurs.component";
import {EquipesComponent} from "./equipes/equipes.component";
import {JoueurListeComponent} from "./joueurs/joueur-liste.component";
import {JoueurAjoutComponent} from "./joueurs/joueurs_ajout.component";
import {TournoisComponent} from "./tournois/tournois.component";
import {EquipesAjoutComponent} from "./equipes/equipe_ajout.component";
import {EquipeListeComponent} from "./equipes/equipe_liste.component";

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
];

