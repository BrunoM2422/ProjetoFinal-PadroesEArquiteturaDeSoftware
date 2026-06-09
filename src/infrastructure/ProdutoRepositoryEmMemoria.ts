// src/infrastructure/ProdutoRepositoryEmMemoria.ts
import { Produto } from "../domain/entities/Produto";
import { IProdutoRepository } from "../domain/repositories/IProdutoRepository";

// Essa classe implementa o contrato do domínio, simulando um banco de dados
export class ProdutoRepositoryEmMemoria implements IProdutoRepository {
  private produtos: Produto[] = [];

  async salvar(produto: Produto): Promise<void> {
    this.produtos.push(produto);
    console.log(`[Banco de Dados] Produto '${produto.nome}' salvo com sucesso no array!`);
  }

  async buscarPorId(id: string): Promise<Produto | null> {
    const produto = this.produtos.find(p => p.id === id);
    return produto || null;
  }
}