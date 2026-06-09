// src/infrastructure/controllers/CriarProdutoController.ts
import { Request, Response } from "express";
import { CriarProdutoUseCase } from "../../application/use-cases/CriarProdutoUseCase";

export class CriarProdutoController {
  // O controller precisa do caso de uso para delegar a ação
  constructor(private criarProdutoUseCase: CriarProdutoUseCase) {}

  async lidar(req: Request, res: Response): Promise<void> {
    try {
      const { nome, preco } = req.body;

      // Executa o caso de uso com os dados da requisição
      const produtoCriado = await this.criarProdutoUseCase.executar({ nome, preco });

      // Retorna o HTTP Status 201 (Created) e o objeto criado
      res.status(201).json({
        sucesso: true,
        dados: {
          id: produtoCriado.id,
          nome: produtoCriado.nome,
          preco: produtoCriado.preco
        }
      });
    } catch (error: any) {
      // Clean Code: Tratamento de erro explícito devolvendo Bad Request (400)
      res.status(400).json({
        sucesso: false,
        erro: error.message || "Erro interno ao processar requisição."
      });
    }
  }
}