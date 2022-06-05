import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Game } from '../model/Game';
import { map, take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  addGame(g: Game) {
    const listGames = this.db.list('/game');
    return listGames.push({
      nome: g.nome,
      foto: g.foto,
      preco: g.preco,
      estudio: g.estudio,
      descricao: g.descricao,
      anoLancamento: g.anoLancamento
    });
  }

  updateGame(id: string, g: Game) {
    const listGames = this.db.object('/game' + id);
    return listGames.update({
      nome: g.nome,
      foto: g.foto,
      preco: g.preco,
      estudio: g.estudio,
      descricao: g.descricao,
      anoLancamento: g.anoLancamento
    });
  }

  deleteGame(id: string) {
    const listGames = this.db.object('/game' + id);
    listGames.remove();
  }

  getGames() {
    return this.db.list('/game');
  }

  getGameById(id: string) {
    return this.db.object('/game' + id);
  }
}
