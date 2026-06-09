// src/application/use-cases/CriarPedidoUseCase.ts
import { Pedido } from "../../domain/entities/Pedido";
import { Produto } from "../../domain/entities/Produto";
import { IPedidoRepository } from "../../domain/repositories/IPedidoRepository";
import { IProdutoRepository } from "../../domain/repositories/IProdutoRepository";
import { SemDesconto } from "../../domain/strategies/SemDesconto";
import { DescontoCupomNatal } from "../../domain/strategies/DescontoCupomNatal";
import { IEstrategiaDesconto } from "../../domain/strategies/IEstrategiaDesconto";

interface CriarPedidoInput {
  produtoIds: string[];
  cupom?: string;
}

export class CriarPedidoUseCase {
  // Injetamos ambos os repositórios para coordenar a ação
  constructor(
    private pedidoRepository: IPedidoRepository,
    private produtoRepository: IProdutoRepository
  ) {}

  async executar(input: CriarPedidoInput): Promise<Pedido> {
    const produtosValidados: Produto[] = [];

    // 1. Busca e valida se todos os produtos requisitados realmente existem
    for (const id of input.produtoIds) {
      const produto = await this.produtoRepository.buscarPorId(id);
      if (!produto) {
        throw new Error(`Erro de Aplicação: Produto com ID ${id} não foi encontrado.`);
      }
      produtosValidados.push(produto);
    }

    // 2. Aplicação do Padrão Strategy (GoF) de forma dinâmica
    // Se o cliente digitou o cupom correto, trocamos a estratégia em tempo de execução
    let estrategia: IEstrategiaDesconto = new SemDesconto();
    
    if (input.cupom?.trim().toUpperCase() === "NATAL15") {
      estrategia = new DescontoCupomNatal();
    } else if (input.cupom) {
      throw new Error("Erro de Aplicação: Cupom de desconto inválido ou expirado.");
    }

    // 3. Cria a entidade de Pedido através do seu Factory Method
    const idPedido = crypto.randomUUID();
    const novoPedido = Pedido.criar(idPedido, produtosValidados, estrategia);

    // 4. Salva no banco de dados de pedidos
    await this.pedidoRepository.salvar(novoPedido);

    return novoPedido;
  }
}