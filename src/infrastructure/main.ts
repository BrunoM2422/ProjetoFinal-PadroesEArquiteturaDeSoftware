// src/infrastructure/main.ts
import { CriarProdutoUseCase } from "../application/use-cases/CriarProdutoUseCase";
import { ProdutoRepositoryEmMemoria } from "./ProdutoRepositoryEmMemoria";

async function iniciarAplicacao() {
  console.log("🚀 Executando Fluxo Completo (Clean Architecture)...\n");

  // 1. Instanciamos a infraestrutura (o "banco de dados" fake)
  const bancoDeDadosFake = new ProdutoRepositoryEmMemoria();

  // 2. Injetamos o banco no Caso de Uso (Inversão de Dependência)
  const criarProdutoUseCase = new CriarProdutoUseCase(bancoDeDadosFake);

  try {
    // 3. Simulamos uma requisição chegando para criar um produto
    console.log("📥 Recebendo dados da requisição...");
    const produtoCriado = await criarProdutoUseCase.executar({
      nome: "Board Game - Terraforming Mars",
      preco: 320.00
    });

    console.log(`\n🎉 Sucesso! Produto retornado pelo Use Case:`);
    console.log(`ID: ${produtoCriado.id}`);
    console.log(`Nome: ${produtoCriado.nome}`);
    console.log(`Preço: R$ ${produtoCriado.preco}`);

  } catch (error: any) {
    console.error(`❌ Erro no fluxo: ${error.message}`);
  }
}

iniciarAplicacao();