// src/infrastructure/PedidoRepositoryEmMemoria.ts
import { Pedido } from "../domain/entities/Pedido";
import { IPedidoRepository } from "../domain/repositories/IPedidoRepository";

export class PedidoRepositoryEmMemoria implements IPedidoRepository {
  private pedidos: Pedido[] = [];

  async salvar(pedido: Pedido): Promise<void> {
    this.pedidos.push(pedido);
    console.log(`[Banco de Dados] Pedido ID '${pedido.id}' registrado com sucesso no array.`);
  }

  async listarTodos(): Promise<Pedido[]> {
    return this.pedidos;
  }
}