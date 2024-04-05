import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {NgFor} from "@angular/common";
import {EquipesService} from "../service/equipes.service";
import {HttpClient} from "@angular/common/http";
import {RouterLink, RouterOutlet} from "@angular/router";



@Component({
  selector: 'app-equipes',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './equipes.component.html',
  styleUrl: './equipes.component.css'
})
export class EquipesComponent implements OnInit{
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.afficherEquipes();
  }

  private equipesService = inject(EquipesService);
  equipes: any = [];

  afficherEquipes() {
    this.equipesService.getEquipe().subscribe((equipe: any) => {
      console.log(equipe);
      this.equipes = equipe;
    });
  }



}
