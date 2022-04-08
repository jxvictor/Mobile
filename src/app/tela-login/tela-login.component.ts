import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    this.serv.getUsuarios().subscribe((res)=>{
      console.log('resposta: ' + res);

      listaUsuarios = res;

      try {
        const usuarioEncontrado = listaUsuarios.filter((usuario)=> usuario.cpf === this.usuario.cpf)[0];
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
      cpf: [null],
      senha: [null],
    });
  }


}
