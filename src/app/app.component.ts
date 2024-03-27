import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {JoueursComponent} from "./joueurs/joueurs.component";
import {FormsModule} from "@angular/forms";
import {EquipesComponent} from "./equipes/equipes.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JoueursComponent, FormsModule, EquipesComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FullstackFrontAngular';
}
