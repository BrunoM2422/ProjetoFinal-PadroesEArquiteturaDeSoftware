// src/domain/repositories/IProdutoRepository.ts
import { Produto } from "../entities/Produto";

export interface IProdutoRepository {
  salvar(produto: Produto): Promise<void>;
  buscarPorId(id: string): Promise<Produto | null>;
  listarTodos(): Promise<Produto[]>;
}