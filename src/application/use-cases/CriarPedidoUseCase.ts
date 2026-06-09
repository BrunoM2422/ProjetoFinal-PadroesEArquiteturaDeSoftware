// src/application/use-cases/CriarPedidoUseCase.ts
import { Pedido } from "../../domain/entities/Pedido";
import { Produto } from "../../domain/entities/Produto";
import { IPedidoRepository } from "../../domain/repositories/IPedidoRepository";
import { IProdutoRepository } from "../../domain/repositories/IProdutoRepository";
import { SemDesconto } from "../../domain/strategies/SemDesconto";
import { DescontoCupomNatal } from "../../domain/strategies/DescontoCupomNatal";
import { IEstrategiaDesconto } from "../../domain/strategies/IEstrategiaDesconto";
import { IPedidoCriadoObserver } from "../observers/IPedidoCriadoObserver"; // <-- Nova importação

interface CriarPedidoInput {
  produtoIds: string[];
  cupom?: string;
}

export class CriarPedidoUseCase {
  // Lista que guardará todos os observers interessados neste evento
  private observers: IPedidoCriadoObserver[] = [];

  constructor(
    private pedidoRepository: IPedidoRepository,
    private produtoRepository: IProdutoRepository
  ) {}

  // Método do padrão Observer para registar novos interessados de fora
  public registrarObserver(observer: IPedidoCriadoObserver): void {
    this.observers.push(observer);
  }

  async executar(input: CriarPedidoInput): Promise<Pedido> {
    const produtosValidados: Produto[] = [];

    for (const id of input.produtoIds) {
      const produto = await this.produtoRepository.buscarPorId(id);
      if (!produto) {
        throw new Error(`Erro de Aplicação: Produto com ID ${id} não foi encontrado.`);
      }
      produtosValidados.push(produto);
    }

    let estrategia: IEstrategiaDesconto = new SemDesconto();
    
    if (input.cupom?.trim().toUpperCase() === "NATAL15") {
      estrategia = new DescontoCupomNatal();
    } else if (input.cupom) {
      throw new Error("Erro de Aplicação: Cupom de desconto inválido ou expirado.");
    }

    const idPedido = crypto.randomUUID();
    const novoPedido = Pedido.criar(idPedido, produtosValidados, estrategia);

    await this.pedidoRepository.salvar(novoPedido);

    // 📢 PADRÃO OBSERVER EM AÇÃO:
    // Notifica todos os observadores registados de forma assíncrona e desacoplada
    this.notificarObservers(novoPedido);

    return novoPedido;
  }

  private notificarObservers(pedido: Pedido): void {
    // Dispara a notificação para cada observer sem bloquear o fluxo principal
    this.observers.forEach(observer => {
      observer.notificar(pedido).catch(err => 
        console.error(`[Erro no Observer] Falha ao executar ação secundária: ${err.message}`)
      );
    });
  }
}