import { UsuarioService } from './../service/usuario.service';
import { Component } from '@angular/core';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  serv: UsuarioService;
  usuario = new Array<Usuario>();

  constructor(usuarioService: UsuarioService) {
    this.serv = usuarioService;
    usuarioService.getUsuario().subscribe(response => (this.usuario = response));
  }

  onClickSalvar(){
    const proximoId = this.usuario.length+1;
    let u = new Usuario(proximoId, 'Usuario', '12341','localfoto',new Date(10/11/2000),'rua ba','1850');

    this.serv.addUsuario(u).subscribe(response=>{
      u=response;
      this.serv.getUsuario().subscribe(resp => (this.usuario = resp));
    });
  }

 /* onClickUpdate(){
    const proximoId = this.usuario.length+1;
    let u = new Usuario(proximoId, 'Usuario', '12341','localfoto',new Date(10/11/2000),'rua ba','1850');

    this.serv.addUsuario(u).subscribe(response=>{
      u=response;
      this.serv.getUsuario().subscribe(resp => (this.usuario = resp));
    });
  }*/

  onClickDelete(){
    const id = this.usuario.length;

    this.serv.deleteUsuario(id).subscribe(response=>{
      //u = response;
      this.serv.getUsuario().subscribe(resp => (this.usuario = resp));
    });
  }

}
