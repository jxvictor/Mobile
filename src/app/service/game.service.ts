import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Game } from '../model/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameList: AngularFireList<any>;
  gameRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  addGame(g: Game){
    this.gameList = this.db.list('/games');
    return this.gameList.push(g);
  }

  updateGame(id, g: Game) {
    return this.gameRef.update(g);
  }

  deleteGame(id: number) {
    this.gameRef = this.db.object('/games/' + id);
    this.gameRef.remove();
  }

  getGames() {
    this.gameList = this.db.list('/games');
    return this.gameList;
  }

  getGameById(id: number){
    this.gameRef = this.db.object('/games/' + id);
    return this.gameRef;
  }
}
