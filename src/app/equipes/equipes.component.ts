import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgFor} from "@angular/common";
import {EquipesService} from "../equipes.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-equipes',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './equipes.component.html',
  styleUrl: './equipes.component.css'
})
export class EquipesComponent {
  constructor(private http: HttpClient) {}

  private equipesService = inject(EquipesService);
  equipes: any = [];

  ngOnInit(): void {
    this.afficherEquipes();
  }

  afficherEquipes() {
    this.equipesService.getEquipe().subscribe((equipe: any) => {
      console.log(equipe);
      this.equipes = equipe;
    });
  }

  ajouterEquipe(formData: any) {
    const EquipesData = {
      categorie: [
        {age: formData.age.toString()},
        {niveau: formData.niveau}
      ],
      nom: formData.nom,
      point: formData.point,
      prenom: formData.prenom,
      sexe: formData.sexe
    };
    console.warn(EquipesData);
    this.equipesService.ajouterEquipe(EquipesData).subscribe((reponse) => {
      console.warn(reponse);
      this.afficherEquipes();
    });
  }

}
