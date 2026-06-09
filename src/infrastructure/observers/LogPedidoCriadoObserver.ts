// src/infrastructure/observers/LogPedidoCriadoObserver.ts
import { IPedidoCriadoObserver } from "../../application/observers/IPedidoCriadoObserver";
import { Pedido } from "../../domain/entities/Pedido";

export class LogPedidoCriadoObserver implements IPedidoCriadoObserver {
  async notificar(pedido: Pedido): Promise<void> {
    console.log(`\n📢 [AUDITORIA LOG] Pedido processado: ID ${pedido.id} | Total Final: R$ ${pedido.totalComDesconto.toFixed(2)}`);
  }
}