import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  endpoint = 'http://localhost:3000/game';

  constructor(private http: HttpClient) { }

  addGames(game: Game): Observable<any> {
    const httpOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.endpoint, JSON.stringify(game), httpOptions);
  }

  updateGame(game: Game): Observable<any> {
    const httpOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.endpoint + '/' + game.id, JSON.stringify(game), httpOptions);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(this.endpoint + '/' + id);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.endpoint);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(this.endpoint + '/' + id);
  }
}