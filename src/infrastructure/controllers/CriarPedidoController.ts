// src/infrastructure/controllers/CriarPedidoController.ts
import { Request, Response } from "express";
import { CriarPedidoUseCase } from "../../application/use-cases/CriarPedidoUseCase";

export class CriarPedidoController {
  constructor(private criarPedidoUseCase: CriarPedidoUseCase) {}

  async lidar(req: Request, res: Response): Promise<void> {
    try {
      const { produtoIds, cupom } = req.body;

      const pedido = await this.criarPedidoUseCase.executar({ produtoIds, cupom });

      res.status(201).json({
        sucesso: true,
        dados: {
          id: pedido.id,
          totalOriginal: pedido.totalOriginal,
          totalComDesconto: pedido.totalComDesconto,
          produtos: pedido.produtos.map(p => ({ nome: p.nome, preco: p.preco }))
        }
      });
    } catch (error: any) {
      res.status(400).json({ sucesso: false, erro: error.message });
    }
  }
}