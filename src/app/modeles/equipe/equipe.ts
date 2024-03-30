import {Joueur} from '../joueur/joueur';

export class Equipe {
  private _id: string;
  private _type: string;
  private _tabJoueurs: Joueur[];

  constructor(id: string, type: string, tabJoueurs: Joueur[] = [] ) {
    this._id=id;
    this._type = type;
    this._tabJoueurs = tabJoueurs;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get tabJoueurs(): Joueur[] {
    return this._tabJoueurs;
  }

  set tabJoueurs(value: Joueur[]) {
    this._tabJoueurs = value;
  }
}
