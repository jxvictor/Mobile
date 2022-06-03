import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Game } from '../model/Game';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {

  games: Game[] = [];
  form: FormGroup;
  isOpen: boolean = false;
  jogo: Game = new Game();

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder
  ) { 
    this.initForm();
  }

  ngOnInit() {
    this.listarJogos();
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      foto: [{value:null, disabled: true}],
      preco: [null, Validators.required],
      estudio: [null, Validators.required],
      descricao: [null, Validators.required],
      anoLancamento: [null, Validators.required]
    });
  }

  listarJogos() {
    this.gameService.getGames().subscribe(res => {
      this.games = res;
    })
  }

  voltarParaOMenu() {
    console.log('asdadasd');
    
    let id = this.buscarIdUsuarioPelaRota();
    this.router.navigateByUrl('home/' + id);
  }

  private buscarIdUsuarioPelaRota() {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  async alertaConfirmacao(id: number) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Deseja realmente excluir este Jogo?',
      buttons: [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        handler: () => {
          this.excluirGame(id);
        }
      }
      ]
    });
    await alert.present();
  }

  abrirModalCadastro(game?: Game) {
    this.form.patchValue(game);
    this.jogo = game;
    this.isOpen = true;
  }

  excluirGame(id: number) {
    this.gameService.deleteGame(id).subscribe( () => {
      this.listarJogos();
    })
  }

  salvar() {
    this.jogo = this.form.getRawValue();

    if (this.jogo?.id) {
      this.gameService.updateGame(this.jogo).subscribe(() => {
        this.listarJogos();
      })
    }
    else {
      this.jogo.foto = './assets/manutencao.jpeg';
      this.gameService.addGames(this.jogo).subscribe(() => {
        this.listarJogos();
      })
    }
    this.form.reset();
    this.isOpen = false;
  }

  fecharModal() {
    this.isOpen = false;
    this.form.reset();
  }
}