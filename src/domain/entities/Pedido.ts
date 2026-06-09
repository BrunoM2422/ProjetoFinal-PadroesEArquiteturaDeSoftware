// src/domain/entities/Pedido.ts
import { Produto } from "./Produto";
import { IEstrategiaDesconto } from "../strategies/IEstrategiaDesconto";

export class Pedido {
  private constructor(
    public readonly id: string,
    private readonly _produtos: Produto[],
    private _totalOriginal: number,
    private _totalComDesconto: number
  ) {}

  // Factory Method para garantir que o pedido nasça consistente
  public static criar(id: string, produtos: Produto[], estrategia: IEstrategiaDesconto): Pedido {
    if (!produtos || produtos.length === 0) {
      throw new Error("Erro de Domínio: Um pedido precisa ter pelo menos um produto.");
    }

    // Calcula o somatório dos preços dos produtos agregados
    const totalOriginal = produtos.reduce((acc, prod) => acc + prod.preco, 0);
    
    // Executa a Strategy injetada dinamicamente para obter o valor final
    const totalComDesconto = estrategia.aplicar(totalOriginal);

    return new Pedido(id, produtos, totalOriginal, totalComDesconto);
  }

  // Getters para expor os dados encapsulados de forma segura
  public get produtos(): Produto[] { return this._produtos; }
  public get totalOriginal(): number { return this._totalOriginal; }
  public get totalComDesconto(): number { return this._totalComDesconto; }
}