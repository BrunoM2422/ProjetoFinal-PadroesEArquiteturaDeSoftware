classDiagram
    class Produto {
        +string id
        +string nome
        +number preco
        +criar(id, nome, preco) Produto$
    }

    class IEstrategiaDesconto {
        <<interface>>
        +calcular(total) number
    }
    class SemDesconto {
        +calcular(total) number
    }
    class DescontoCupomNatal {
        +calcular(total) number
    }
    IEstrategiaDesconto <|.. SemDesconto
    IEstrategiaDesconto <|.. DescontoCupomNatal

    class Pedido {
        +string id
        +Produto[] produtos
        +number totalOriginal
        +number totalComDesconto
        +criar(id, produtos, estrategia) Pedido$
    }
    Pedido --> Produto
    Pedido --> IEstrategiaDesconto

    class IPedidoCriadoObserver {
        <<interface>>
        +notificar(pedido) Promise
    }
    class LogPedidoCriadoObserver {
        +notificar(pedido) Promise
    }
    class EmailSimuladoObserver {
        +notificar(pedido) Promise
    }
    IPedidoCriadoObserver <|.. LogPedidoCriadoObserver
    IPedidoCriadoObserver <|.. EmailSimuladoObserver

    class CriarPedidoUseCase {
        -IPedidoCriadoObserver[] observers
        +registrarObserver(observer)
        +executar(input) Pedido
    }
    CriarPedidoUseCase --> IPedidoCriadoObserver