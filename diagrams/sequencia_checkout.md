sequenceDiagram
    autonumber
    actor Cliente as Interface Web (SPA)
    participant Ctrl as CriarPedidoController
    participant UC as CriarPedidoUseCase
    participant Domain as Entidade Pedido (Domain)
    participant Repo as PedidoRepository
    participant Obs as Observers (Log/Email)

    Cliente->>Ctrl: POST /pedidos { produtoIds, cupom }
    Ctrl->>UC: executar({ produtoIds, cupom })
    UC->>UC: Valida e busca produtos no repositório
    UC->>Domain: Pedido.criar(id, produtos, estrategia)
    Domain-->>UC: Instância de Pedido (Calculada via Strategy)
    UC->>Repo: salvar(novoPedido)
    UC->>Obs: notificarObservers(novoPedido)
    par Efeitos Colaterais Assíncronos
        Obs->>Obs: LogPedidoCriadoObserver: Executa log auditoria
        Obs->>Obs: EmailSimuladoObserver: Envia e-mail mockado
    end
    UC-->>Ctrl: Retorna Pedido criado
    Ctrl-->>Cliente: Resposta HTTP 201 { sucesso: true }