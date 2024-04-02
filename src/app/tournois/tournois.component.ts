import { Component } from '@angular/core';
import { TournoisService } from "../service/tournois.service";

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  standalone: true,
  styleUrls: ['./tournois.component.css']
})
export class TournoisComponent {
  idMatchInput: string;
  equipeIdInput: string;
  idMatchFinInput: string;

  constructor(private tournoisService: TournoisService) {
    this.idMatchInput = '';
    this.equipeIdInput = '';
    this.idMatchFinInput = '';
  }

  enregistrerPoint(idMatch: string, equipeId: string) {
    this.tournoisService.enregistrerPoint(idMatch, equipeId).subscribe(response => {
      console.log(response);
      this.idMatchInput = idMatch
      this.equipeIdInput = equipeId
      // Gérer la réponse du backend si nécessaire
    });
  }

  finirMatch(idMatch: string) {
    this.tournoisService.finirMatch(idMatch).subscribe(response => {
      console.log(response);
      this.idMatchFinInput = idMatch
      // Gérer la réponse du backend si nécessaire
    });
  }

  lancerMatch() {
    this.tournoisService.lancerMatch().subscribe(response => {
      console.log(response);
      // Gérer la réponse du backend si nécessaire
    });
  }
}
