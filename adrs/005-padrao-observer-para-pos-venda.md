# ADR-005: Implementação do Padrão GoF Observer no Checkout

* **Status:** Accepted
* **Contexto:** Após a conclusão de um pedido, precisamos disparar e-mails e logs de auditoria. Colocar isso dentro do Caso de Uso violaria o Single Responsibility Principle (SRP).
* **Decisão:** Implementamos o padrão Observer. O Caso de Uso apenas "notifica" o evento `PedidoCriado`, e classes externas (LogObserver, EmailObserver) reagem a ele.
* **Consequências:** Desacoplamento total entre o processo de checkout e as rotinas secundárias de notificação.