export class Usuario{
  id: number;
  nome: string;
  $key: string;
  cpf: string;
  foto: string;
  dataNascimento: Date;
  endereco: string;
  senha: string;
  idade: number;

  constructor(
    id?: number,
    $key?: string,
    nome?: string,
    cpf?: string,
    foto?: string,
    dataNascimento?: Date,
    endereco?: string,
    senha?: string,
    idade?: number
) {
    this.id = id;
    this.$key = $key;
    this.nome = nome;
    this.cpf = cpf;
    this.foto = foto;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.senha = senha;
    this.idade = idade;
  }
}
