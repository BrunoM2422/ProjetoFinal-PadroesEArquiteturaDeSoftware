# ADR-002: Adoção de Monolito Modular no plano macro

* **Status:** Accepted
* **Contexto:** A equipe tem um prazo restrito para entrega e a complexidade de gerenciar rede, deployment e consistência eventual de Microsserviços é um risco alto.
* **Decisão:** O sistema será um Monolito Modular. Os domínios (Catálogo, Pedidos, Usuários) residirão na mesma base de código, mas divididos logicamente.
* **Consequências:** Facilidade de deploy e execução local, sacrificando a escalabilidade independente de módulos individuais.