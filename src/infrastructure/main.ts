// src/infrastructure/main.ts
import express from "express";
import { ProdutoRepositoryEmMemoria } from "./ProdutoRepositoryEmMemoria";
import { CriarProdutoUseCase } from "../application/use-cases/CriarProdutoUseCase";
import { CriarProdutoController } from "./controllers/CriarProdutoController";

// Novas importações:
import { ListarProdutosUseCase } from "../application/use-cases/ListarProdutosUseCase";
import { ListarProdutosController } from "./controllers/ListarProdutosController";

const app = express();
app.use(express.json());

// 1. Inicializa o banco compartilhado
const produtoRepository = new ProdutoRepositoryEmMemoria();

// 2. Configuração do Fluxo de Criação (POST)
const criarProdutoUseCase = new CriarProdutoUseCase(produtoRepository);
const criarProdutoController = new CriarProdutoController(criarProdutoUseCase);

// 3. Configuração do Fluxo de Listagem (GET)
const listarProdutosUseCase = new ListarProdutosUseCase(produtoRepository);
const listarProdutosController = new ListarProdutosController(listarProdutosUseCase);

// 4. Definição das Rotas
app.post("/produtos", (req, res) => { criarProdutoController.lidar(req, res); });
app.get("/produtos", (req, res) => { listarProdutosController.lidar(req, res); }); // <-- Nova Rota!

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`🚀 Servidor HTTP rodando na porta ${PORTA}`);
  console.log(`📥 GET habilitado em http://localhost:${PORTA}/produtos`);
});