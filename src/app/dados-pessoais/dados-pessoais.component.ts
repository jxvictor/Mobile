import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss'],
})
export class DadosPessoaisComponent implements OnInit {

  usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let id = this.buscarIdUsuarioPelaRota();

    this.usuarioService.getUsuarioById(environment.idLogin.toString()).snapshotChanges().subscribe(res => {
      this.usuario = res.payload.toJSON() as Usuario;
      this.calcularIdade();
    });
  }

  private buscarIdUsuarioPelaRota() {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  calcularIdade(): void {
    let today = new Date();
    let dataNasc = new Date(this.usuario.dataNascimento);
    let age = today.getFullYear() - dataNasc.getFullYear();
    const m = today.getMonth() - dataNasc.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dataNasc.getDate())) {
      age--;
    }
    this.usuario.idade = age;
  }

  voltarParaOMenu() {
    let id = this.buscarIdUsuarioPelaRota();
    this.router.navigateByUrl('home/' + id);
  }

}
