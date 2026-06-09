# E-Commerce Clean API
Projeto final desenvolvido para a disciplina de Padrões e Arquitetura de Software. O sistema consiste no núcleo de um E-commerce focado em isolamento de domínio, testabilidade e aplicação estrita de padrões de projeto estruturais e comportamentais.

## 👥 Equipe
*Bruno Lenitta Machado - RA: 25008041​

*Gabriel Branco de Medeiros - RA: 24014205​

*Gabriel Scolfaro de Azeredo - RA: 25006194​

*João Victor Moreira Vidal - RA: 19291384​

*Nicolas Mitjans Nunes - RA: 25005124​

*Pedro Bellinetti Silva - RA: 24027914​

## 🛠️ Como Instalar e Executar
1. Clone o repositório: `git clone [url-do-repositorio]`
2. Instale as dependências: `npm install`
3. Inicie o servidor em modo dev: `npm run dev`
4. Acesse a interface visual (SPA) gerada pelo Express: **http://localhost:3000**
5. Para rodar a suíte de testes automatizados unitários: `npm run test`

## 🏗️ Atributos de Qualidade e Decisões Arquiteturais
* **Manutenibilidade:** Alcançada através da adoção da Clean Architecture, garantindo que o Domínio (regras de negócio) seja independente de frameworks e bancos de dados (ADR-001).
* **Testabilidade:** As entidades de negócio são funções puras e classes TypeScript que não requerem *mocks* complexos de rede ou banco de dados para serem validadas.

### Plano Macro e Interno
Adotamos o modelo de **Monolito Modular** no plano macro (devido ao escopo e tamanho da equipe) e a **Clean Architecture** de Robert C. Martin no plano interno, dividida em:
1. `Domain`: Entidades (Produto, Pedido) e contratos de Repositórios.
2. `Application`: Casos de Uso (CriarPedido, ListarProdutos).
3. `Infrastructure`: Express (Controllers), Banco em Memória e roteamento.

## 🧱 Princípios SOLID Aplicados
* **(S) SRP:** Casos de uso altamente granulares (`CriarPedidoUseCase` faz apenas a orquestração do pedido).
* **(O) OCP:** Uso do padrão Strategy (`IEstrategiaDesconto`). O sistema aceita novos cupons sem alterar o código base do `Pedido`.
* **(D) DIP:** Inversão de dependência nos repositórios. O Caso de Uso depende da interface `IProdutoRepository` e não da implementação concreta do banco.

## 🎯 Padrões GoF Implementados
1. **Factory Method (Criação):** Implementado no método estático `Produto.criar()`, garantindo que objetos não nasçam em estado inválido.
2. **Strategy (Comportamento):** Implementado nas classes de `DescontoCupomNatal`, evitando *code smells* de IF/ELSE no cálculo de totais.
3. **Observer (Comportamento):** O Caso de Uso `CriarPedido` notifica as classes `LogPedidoCriadoObserver` e `EmailSimuladoObserver` desacoplando o processo de checkout dos efeitos colaterais.

## 📄 Diagramas e ADRs
* O detalhamento das decisões arquiteturais encontra-se na pasta `/adrs`.
* A documentação da API em padrão OpenAPI 3.x encontra-se no arquivo `/openapi.yaml`.
* Diagramas em formato de código (Mermaid) estão disponíveis na pasta `/diagrams`.