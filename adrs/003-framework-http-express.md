# ADR-003: Uso do Express.js substituindo Fastify

* **Status:** Superseded (Modificada ao longo do desenvolvimento)
* **Contexto:** Inicialmente queríamos a máxima performance de I/O e escolhemos o Fastify. No entanto, ao longo da implementação dos Controllers, a equipe sentiu falta de documentação abundante para certas integrações.
* **Decisão:** Revertemos o uso do Fastify e adotamos o Express.js como infraestrutura web.
* **Consequências:** Leve perda de throughput (requisições por segundo), compensada pelo vasto ecossistema e familiaridade da equipe com a API do Express, acelerando o desenvolvimento.