// src/application/use-cases/CriarProdutoUseCase.ts
import { Produto } from "../../domain/entities/Produto";
import { IProdutoRepository } from "../../domain/repositories/IProdutoRepository";

// Clean Code: DTO (Data Transfer Object) para entrada de dados limpa
interface CriarProdutoInput {
  nome: string;
  preco: number;
}

export class CriarProdutoUseCase {
  // DIP: O Caso de Uso depende da INTERFACE (IProdutoRepository), não de um banco real.
  constructor(private produtoRepository: IProdutoRepository) {}

  async executar(input: CriarProdutoInput): Promise<Produto> {
    // Geramos um ID único simulado para o produto
    const idUnico = crypto.randomUUID();

    // O Domínio valida as regras de negócio ao criar
    const novoProduto = Produto.criar(idUnico, input.nome, input.preco);

    // O Repositório faz a persistência
    await this.produtoRepository.salvar(novoProduto);

    return novoProduto;
  }
}