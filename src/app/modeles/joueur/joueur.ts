export interface Categorie {
  age: number;
  niveau: string;
}

export class Joueur {
  prenom: string;
  nom: string;
  sexe: string;
  categorie: Categorie[];
  point: number;

  constructor(prenom: string, nom: string, sexe: string, categorie: Categorie[], point: number) {
    this.prenom = prenom;
    this.nom = nom;
    this.sexe = sexe;
    this.categorie = categorie;
    this.point = point;
  }
}
