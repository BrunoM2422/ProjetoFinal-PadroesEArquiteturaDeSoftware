# ADR-004: Implementação do Padrão GoF Strategy para cálculo de cupons

* **Status:** Accepted
* **Contexto:** A regra de negócios de e-commerce exige diferentes tipos de cupons de desconto (Natal, Black Friday, etc.). Usar blocos `if/switch` no Domínio violaria o princípio Open-Closed (SOLID).
* **Decisão:** Criamos a interface `IEstrategiaDesconto`. Cada tipo de desconto é uma classe concreta, injetada dinamicamente no `Pedido`.
* **Consequências:** O sistema permite a adição de infinitos novos cupons sem alterar o código existente da classe `Pedido`.