// src/application/use-cases/ListarProdutosUseCase.ts
import { Produto } from "../../domain/entities/Produto";
import { IProdutoRepository } from "../../domain/repositories/IProdutoRepository";

export class ListarProdutosUseCase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async executar(): Promise<Produto[]> {
    // Apenas pede para o repositório buscar todos os dados
    return await this.produtoRepository.listarTodos();
  }
}