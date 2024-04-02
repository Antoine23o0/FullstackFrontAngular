import {Component, inject, OnInit} from '@angular/core';
import {EquipementsService} from "../service/equipements.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";


// il me manque modifier l'equipement

@Component({
  selector: 'app-equipement-get',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './equipement-get.component.html',
  styleUrl: './equipement-get.component.css'
})
export class EquipementGetComponent implements OnInit{

  equipement: any;

  private equipementServ = inject(EquipementsService);
  ngOnInit(): void {
    this.getEquipement()
  }

  getEquipement(): void {
    this.equipementServ.getEquipement().subscribe((equipement: any) => {
      console.log(equipement);
      this.equipement = equipement;
    });
  }

  modifierEquipement() {

  }

  ajouterEquipement(date : any){
    this.equipementServ.ajouterEquipement(date).subscribe((reponse)=>{
      console.warn(reponse)
    });
  }

}
