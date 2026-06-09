// src/domain/strategies/SemDesconto.ts
import { IEstrategiaDesconto } from "./IEstrategiaDesconto";

export class SemDesconto implements IEstrategiaDesconto {
  aplicar(total: number): number {
    return total; // Retorna o valor cheio, sem alterações
  }
}