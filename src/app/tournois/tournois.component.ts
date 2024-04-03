import { Component } from '@angular/core';
import { TournoisService } from "../service/tournois.service";
import {MatchsService} from "../service/matchs.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./tournois.component.css']
})
export class TournoisComponent {

  constructor() {
  }

}
