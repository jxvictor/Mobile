import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  addUsuario(u: Usuario) {
    const listUsuarios = this.db.list('/usuario');
    return listUsuarios.push({
      nome: u.nome,
      cpf: u.cpf,
      foto: u.foto,
      dataNascimento: u.dataNascimento,
      endereco: u.endereco,
      senha: u.senha,
      idade: u.idade
    });
  }

  updateUsuario(id: string, u: Usuario) {
    const listUsuarios = this.db.object('/usuario/' + id);
    return listUsuarios.update({
      nome: u.nome,
      cpf: u.cpf,
      foto: u.foto,
      dataNascimento: u.dataNascimento,
      endereco: u.endereco,
      senha: u.senha,
      idade: u.idade
    });
  }

  deleteUsuario(id: string) {
    const listUsuarios = this.db.object('/usuario/' + id);
    listUsuarios.remove();
  }

  getUsuarios() {
    return this.db.list('/usuario');
  }

  getUsuarioById(id: string) {
    console.log(id);
    
    return this.db.object('/usuario/' + id);
  }
}
