import { UsuarioService } from './../service/usuario.service';
import { Component, ViewChild } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosPessoaisComponent } from '../dados-pessoais/dados-pessoais.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  serv: UsuarioService;
  usuario = new Array<Usuario>();

  constructor(
    private usuarioService: UsuarioService,
    private menu: MenuController,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.serv = usuarioService;
    usuarioService.getUsuarios().subscribe(response => (this.usuario = response));
  }

  onClickSalvar(){
    const proximoId = this.usuario.length+1;
    let u = new Usuario(proximoId, 'Usuario', '12341','localfoto',new Date(10/11/2000),'rua ba','1850');

    this.serv.addUsuario(u).subscribe(response=>{
      u=response;
      this.serv.getUsuarios().subscribe(resp => (this.usuario = resp));
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

  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  onClickDelete(){
    const id = this.usuario.length;

    this.serv.deleteUsuario(id).subscribe(response=>{
      //u = response;
      this.serv.getUsuarios().subscribe(resp => (this.usuario = resp));
    });
  }

  chamarDadosPessoais(): void {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    this.router.navigateByUrl('dados-pessoais/' + id);
  }

  chamarGames(): void {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    this.router.navigateByUrl('games/' + id);
  }
}
