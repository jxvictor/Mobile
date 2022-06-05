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
  usuario = new Array<Usuario>();

  constructor(
    private usuarioService: UsuarioService,
    private menu: MenuController,
    private router: Router,
    private route: ActivatedRoute
    ) {
    let usuarioList = this.usuarioService.getUsuarios();
    usuarioList.snapshotChanges().subscribe(res=> {
      this.usuario = [];
      res.forEach(usuarios=> {
        let a = usuarios.payload.toJSON();
        a['$key'] = usuarios.key;
        this.usuario.push(a as Usuario);
      })})
      this.usuario.reverse().pop();
  }

  onClickSalvar(){
    const proximoId = this.usuario.length+1;
    let u = new Usuario(proximoId, null, 'Usuario', '12341','localfoto', new Date(10/11/2000),'rua ba','1850');
    this.usuarioService.addUsuario(u);
  }

  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  onClickDelete(){
    const id = this.usuario.length;
    this.usuarioService.deleteUsuario(id.toString());
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
