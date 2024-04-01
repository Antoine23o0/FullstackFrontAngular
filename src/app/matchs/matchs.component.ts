import {Component, inject, OnInit} from '@angular/core';
import {MatchsService} from "../service/matchs.service";
import {HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-matchs',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './matchs.component.html',
  styleUrl: './matchs.component.css'
})
export class MatchsComponent implements OnInit{

  private serviceMatch = inject(MatchsService);

  matchs: any = [];

  //constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMatchs();
  }

  ajouterMatch(data : any){
   // console.warn(data)
    this.serviceMatch.ajouterMatch(data).subscribe((response)=>{
      console.warn(response)
    });
  }

  getMatchs() {
    this.serviceMatch.getAllMatchs().subscribe((joueurs : any ) => {
      console.log(joueurs);
      this.matchs = joueurs;
    });
  }
}
