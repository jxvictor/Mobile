import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userList: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  addUsuario(u: Usuario){
    this.userList = this.db.list('/usuario');
    return this.userList.push(u);
  }

  updateUsuario(id, u: Usuario) {
    return this.userRef.update(u);
  }

  deleteUsuario(id: number) {
    this.userRef = this.db.object('/usuario/' + id);
    this.userRef.remove();
  }

  getUsuarios() {
    this.userList = this.db.list('/usuario');
    return this.userList;
  }

  getUsuarioById(id: number){
    this.userRef = this.db.object('/usuario/' + id);
    return this.userRef;
  }
}
