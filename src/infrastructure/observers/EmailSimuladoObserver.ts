// src/infrastructure/observers/EmailSimuladoObserver.ts
import { IPedidoCriadoObserver } from "../../application/observers/IPedidoCriadoObserver";
import { Pedido } from "../../domain/entities/Pedido";

export class EmailSimuladoObserver implements IPedidoCriadoObserver {
  async notificar(pedido: Pedido): Promise<void> {
    console.log(`📧 [EMAIL] Enviando confirmação de compra para o cliente...`);
    console.log(`   -> "Obrigado! O seu pedido com ${pedido.produtos.length} item(ns) foi recebido com sucesso."`);
  }
}