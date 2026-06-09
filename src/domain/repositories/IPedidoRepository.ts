// src/domain/repositories/IPedidoRepository.ts
import { Pedido } from "../entities/Pedido";

export interface IPedidoRepository {
  salvar(pedido: Pedido): Promise<void>;
  listarTodos(): Promise<Pedido[]>;
}