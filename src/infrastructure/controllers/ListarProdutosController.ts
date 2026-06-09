// src/infrastructure/controllers/ListarProdutosController.ts
import { Request, Response } from "express";
import { ListarProdutosUseCase } from "../../application/use-cases/ListarProdutosUseCase";

export class ListarProdutosController {
  constructor(private listarProdutosUseCase: ListarProdutosUseCase) {}

  async lidar(req: Request, res: Response): Promise<void> {
    try {
      const produtos = await this.listarProdutosUseCase.executar();
      
      // Mapeia as entidades de domínio para um formato limpo de JSON de saída
      const dadosFormatados = produtos.map(p => ({
        id: p.id,
        nome: p.nome,
        preco: p.preco
      }));

      res.status(200).json(dadosFormatados);
    } catch (error: any) {
      res.status(500).json({ sucesso: false, erro: "Erro ao listar produtos." });
    }
  }
}