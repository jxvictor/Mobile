/* eslint-disable @typescript-eslint/dot-notation */
import { AngularFireList } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss'],
})
export class TelaLoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  form: FormGroup;
  usuarios = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serv: UsuarioService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.initForm();
  }

  login(){
    let usuarioList = this.serv.getUsuarioById(environment.idLogin.toString());
    usuarioList.snapshotChanges().subscribe(res=> {
      this.usuarios = [];
      let a = res.payload.toJSON();
      this.usuarios.push(a);
      console.log(this.usuarios);

      try {
        const usuarioEncontrado = this.usuarios.filter((usuario)=> usuario.cpf === this.usuario.cpf)[0];
        console.log(usuarioEncontrado);

        if(this.usuario.senha === usuarioEncontrado.senha){
          console.log(usuarioEncontrado.id);
          this.router.navigateByUrl('home/' + usuarioEncontrado.id);
        } else {
          this.mostrarAlertaSenhaErrada();
          this.form.reset();
        }
      } catch (error) {
        this.mostrarAlertaCpfInexistente();
        this.form.reset();
      }
    });
  }

  private async mostrarAlertaSenhaErrada(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Senha incorreta',
      buttons: ['OK']
    });
    await alert.present();
  }

  private async mostrarAlertaCpfInexistente(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'CPF Inexistente',
      buttons: ['OK']
    });
    await alert.present();
  }

  private initForm(): void {
    this.form = this.fb.group({
      $key: [null],
      cpf: [null],
      senha: [null],
    });
  }
}
