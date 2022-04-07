import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';

import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss'],
})
export class TelaLoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serv: UsuarioService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.initForm();
  }

  login(){
    let listaUsuarios = new Array <Usuario>();
    this.serv.getUsuario().subscribe((res)=>{
      console.log(res);

      listaUsuarios = res;
      const usuarioEncontrado = listaUsuarios.filter((usuario)=> usuario.cpf === this.usuario.cpf)[0];
      if(this.usuario.senha === usuarioEncontrado.senha){
        this.router.navigateByUrl('home');
      } else {
        this.mostrarAlerta();
        this.form.reset();
      }
    });
  }

  private async mostrarAlerta(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Senha incorreta',
      buttons: ['OK']
    });
    await alert.present();
  }

  private initForm(): void {
    this.form = this.fb.group({
      cpf: [null],
      senha: [null],
    });
  }


}
