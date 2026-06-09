# ADR-001: Adoção do estilo Clean Architecture para o plano interno

* **Status:** Accepted
* **Contexto:** Precisamos garantir que as regras de negócio de checkout (cálculo de descontos) fiquem isoladas e testáveis, sem depender de frameworks web ou bancos de dados específicos.
* **Decisão:** Adotaremos a Clean Architecture, separando o código em Entities, Use Cases, Interfaces/Adapters e Infrastructure.
* **Consequências:** * Benefícios: Alto nível de testabilidade unitária e isolamento do domínio.
  * Custos: Maior quantidade de arquivos e boilerplate inicial.