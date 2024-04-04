import {Component} from '@angular/core';
import { TournoisService } from "../service/tournois.service";
import {MatchsService} from "../service/matchs.service";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgFor, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgIf,
    NgFor,
    RouterLink,
    RouterOutlet
  ],
  styleUrls: ['./tournois.component.css']
})
export class TournoisComponent {
  constructor(private matcherService: MatchsService,private tournoisService: TournoisService) {

  }





}
