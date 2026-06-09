// src/domain/strategies/IEstrategiaDesconto.ts

// Esta é a interface que define o contrato da nossa Strategy (GoF)
export interface IEstrategiaDesconto {
  aplicar(total: number): number;
}