// src/infrastructure/controllers/ListarPedidosController.ts
import { Request, Response } from "express";
import { ListarPedidosUseCase } from "../../application/use-cases/ListarPedidosUseCase";

export class ListarPedidosController {
  constructor(private listarPedidosUseCase: ListarPedidosUseCase) {}

  async lidar(req: Request, res: Response): Promise<void> {
    try {
      const pedidos = await this.listarPedidosUseCase.executar();
      
      const dadosFormatados = pedidos.map(p => ({
        id: p.id,
        totalOriginal: p.totalOriginal,
        totalComDesconto: p.totalComDesconto,
        quantidadeProdutos: p.produtos.length
      }));

      res.status(200).json(dadosFormatados);
    } catch (error: any) {
      res.status(500).json({ sucesso: false, erro: "Erro ao listar pedidos." });
    }
  }
}