// src/infrastructure/main.ts
import express from "express";
import { ProdutoRepositoryEmMemoria } from "./ProdutoRepositoryEmMemoria";
import { PedidoRepositoryEmMemoria } from "./PedidoRepositoryEmMemoria";

// Importações de Produtos
import { CriarProdutoUseCase } from "../application/use-cases/CriarProdutoUseCase";
import { CriarProdutoController } from "./controllers/CriarProdutoController";
import { ListarProdutosUseCase } from "../application/use-cases/ListarProdutosUseCase";
import { ListarProdutosController } from "./controllers/ListarProdutosController";

// Importações de Pedidos
import { CriarPedidoUseCase } from "../application/use-cases/CriarPedidoUseCase";
import { CriarPedidoController } from "./controllers/CriarPedidoController";
import { ListarPedidosUseCase } from "../application/use-cases/ListarPedidosUseCase";
import { ListarPedidosController } from "./controllers/ListarPedidosController";

const app = express();
app.use(express.json());
app.use(express.static('public'));

// 1. Inicializa a infraestrutura de dados (Bancos em memória)
const produtoRepository = new ProdutoRepositoryEmMemoria();
const pedidoRepository = new PedidoRepositoryEmMemoria();

// 2. Acoplamento do Fluxo de Produtos
const criarProdutoUseCase = new CriarProdutoUseCase(produtoRepository);
const criarProdutoController = new CriarProdutoController(criarProdutoUseCase);
const listarProdutosUseCase = new ListarProdutosUseCase(produtoRepository);
const listarProdutosController = new ListarProdutosController(listarProdutosUseCase);

// 3. Acoplamento do Fluxo de Pedidos (Injetando dependências cruzadas no Use Case)
const criarPedidoUseCase = new CriarPedidoUseCase(pedidoRepository, produtoRepository);
const criarPedidoController = new CriarPedidoController(criarPedidoUseCase);
const listarPedidosUseCase = new ListarPedidosUseCase(pedidoRepository);
const listarPedidosController = new ListarPedidosController(listarPedidosUseCase);

// 4. Definição das Rotas da API
app.post("/produtos", (req, res) => { criarProdutoController.lidar(req, res); });
app.get("/produtos", (req, res) => { listarProdutosController.lidar(req, res); });

app.post("/pedidos", (req, res) => { criarPedidoController.lidar(req, res); });
app.get("/pedidos", (req, res) => { listarPedidosController.lidar(req, res); });

// 5. Ativação do Servidor
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`🚀 Sistema do E-commerce Rodando!`);
  console.log(`💻 Acesse o painel visual em: http://localhost:${PORTA}`);
});