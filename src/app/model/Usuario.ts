export class Usuario{
  id: number;
  nome: string;
  cpf: string;
  foto: string;
  dataNascimento: Date;
  endereco: string;
  senha: string;

  constructor(
    id?: number,
    nome?: string,
    cpf?: string,
    foto?: string,
    dataNascimento?: Date,
    endereco?: string,
    senha?: string
) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.foto = foto;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.senha = senha;
  }
}
