# Diagrama de Sequência (Fluxo de Checkout)

```mermaid
sequenceDiagram
    autonumber
    actor Cliente as Interface Web
    participant Ctrl as CriarPedidoController
    participant UC as CriarPedidoUseCase
    participant Domain as Entidade Pedido
    participant Repo as PedidoRepository
    participant Obs as Observers

    Cliente->>Ctrl: POST /pedidos
    Ctrl->>UC: executar(input)
    UC->>UC: Valida e busca produtos
    UC->>Domain: Pedido.criar()
    Domain-->>UC: Instância de Pedido
    UC->>Repo: salvar(novoPedido)
    UC->>Obs: notificarObservers(novoPedido)
    par Assíncrono
        Obs->>Obs: LogPedidoCriado
        Obs->>Obs: EmailSimulado
    end
    UC-->>Ctrl: Pedido criado
    Ctrl-->>Cliente: HTTP 201
    ```