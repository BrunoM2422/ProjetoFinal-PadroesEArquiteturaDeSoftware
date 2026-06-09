// src/domain/entities/Produto.ts

export class Produto {
  // Construtor privado: impede que o objeto seja instanciado com "new Produto()"
  // forçando o uso do Factory Method abaixo.
  private constructor(
    private readonly _id: string,
    private _nome: string,
    private _preco: number
  ) {}

  // Padrão GoF: Factory Method
  // Encapsula a lógica de criação e garante que um Produto nunca nasça inválido.
  public static criar(id: string, nome: string, preco: number): Produto {
    if (!nome || nome.trim().length === 0) {
      throw new Error("Erro de Domínio: O nome do produto não pode ser vazio.");
    }
    
    if (preco <= 0) {
      throw new Error("Erro de Domínio: O preço do produto deve ser maior que zero.");
    }

    return new Produto(id, nome, preco);
  }

  // Getters (Clean Code: Encapsulamento)
  // Permite ler os dados, mas impede que alguém mude o id ou nome de fora da classe.
  public get id(): string { return this._id; }
  public get nome(): string { return this._nome; }
  public get preco(): number { return this._preco; }

  // Comportamento (Regra de Negócio)
  public aplicarDesconto(porcentagem: number): void {
    if (porcentagem < 0 || porcentagem > 100) {
      throw new Error("Erro de Domínio: Porcentagem de desconto inválida.");
    }
    
    const valorDesconto = (this._preco * porcentagem) / 100;
    this._preco -= valorDesconto;
  }
}