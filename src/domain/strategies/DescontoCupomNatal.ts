// src/domain/strategies/DescontoCupomNatal.ts
import { IEstrategiaDesconto } from "./IEstrategiaDesconto";

export class DescontoCupomNatal implements IEstrategiaDesconto {
  aplicar(total: number): number {
    return total * 0.85; // Aplica 15% de desconto
  }
}