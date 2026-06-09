// src/application/use-cases/ListarPedidosUseCase.ts
import { Pedido } from "../../domain/entities/Pedido";
import { IPedidoRepository } from "../../domain/repositories/IPedidoRepository";

export class ListarPedidosUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async executar(): Promise<Pedido[]> {
    return await this.pedidoRepository.listarTodos();
  }
}