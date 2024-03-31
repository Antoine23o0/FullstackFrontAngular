import {Component, inject} from '@angular/core';
import {JoueursService} from "../services/joueurs.service";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgFor, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-joueurs',
  standalone: true,
  imports: [
    FormsModule, NgFor, RouterOutlet, RouterLink,NgIf
  ],
  templateUrl: './joueurs.component.html',
  styleUrl: './joueurs.component.css'
})
export class JoueursComponent {
  private joueurService = inject(JoueursService);
  joueurs: any = [];

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.loadJoueur();
  }

  loadJoueur() {
    this.joueurService.getJoueurs().subscribe((joueurs: any) => {
      console.log(joueurs);
      this.joueurs = joueurs;
    });
  }

}


