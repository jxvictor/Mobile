export class Game{
  id: number;
  nome: string;
  foto: string;
  preco: number;
  estudio: string;
  descricao: string;
  anoLancamento: string;


  constructor(
    id?: number,
    nome?: string,
    foto?: string,
    preco?: number,
    estudio?: string,
    descricao?: string,
    anoLancamento?: string
) {
    this.id = id;
    this.nome = nome;
    this.foto = foto;
    this.preco = preco;
    this.estudio = estudio;
    this.descricao = descricao;
    this.anoLancamento = anoLancamento;
  }

}

