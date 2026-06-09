// src/application/observers/IPedidoCriadoObserver.ts
import { Pedido } from "../../domain/entities/Pedido";

// Qualquer serviço que queira reagir à criação de um pedido deve implementar esta interface
export interface IPedidoCriadoObserver {
  notificar(pedido: Pedido): Promise<void>;
}