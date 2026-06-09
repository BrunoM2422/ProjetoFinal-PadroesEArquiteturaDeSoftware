# Diagrama de Arquitetura Geral (Plano Interno)

```mermaid
graph TD
    subgraph Infrastructure_Layer [Camada de Infraestrutura]
        Express[Express Framework / main.ts]
        Frontend[Frontend SPA / index.html]
        RepoMemory[Produto/PedidoRepositoryEmMemoria]
        ObserversConcretos[LogPedidoCriadoObserver / EmailSimuladoObserver]
    end

    subgraph Application_Layer [Camada de Aplicação]
        UseCase[CriarPedidoUseCase / ListarProdutosUseCase]
        Interfaces[IPedidoCriadoObserver Interface]
    end

    subgraph Domain_Layer [Camada de Domínio]
        EntityPedido[Entidade: Pedido]
        EntityProduto[Entidade: Produto]
        Strategy[IEstrategiaDesconto / DescontoCupomNatal]
        RepoInterfaces[IProdutoRepository / IPedidoRepository]
    end

    Frontend --> Express
    Express --> UseCase
    UseCase --> EntityPedido
    UseCase --> EntityProduto
    UseCase --> Strategy
    UseCase --> Interfaces
    ObserversConcretos -.->|Implementa| Interfaces
    RepoMemory -.->|Implementa| RepoInterfaces
    UseCase --> RepoInterfaces
    ```