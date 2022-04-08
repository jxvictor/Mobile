import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  endpoint = 'http://localhost:3000/usuario';

  constructor(public http: HttpClient) { }

  addUsuario(u: Usuario): Observable<any> {
    const httpOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.endpoint, JSON.stringify(u), httpOptions);
  }

  updateUsuario(u: Usuario): Observable<any> {
    const httpOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.endpoint + '/' + u.id, JSON.stringify(u), httpOptions);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(this.endpoint + '/' + id);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.endpoint);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.endpoint + '/' + id);
  }
}
