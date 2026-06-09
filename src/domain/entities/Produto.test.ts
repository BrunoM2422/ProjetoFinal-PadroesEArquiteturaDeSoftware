// src/domain/entities/Produto.test.ts
import { Produto } from "./Produto";

describe("Entidade de Domínio: Produto", () => {
  it("deve criar um produto válido com o Factory Method", () => {
    const produto = Produto.criar("123", "Board Game", 200.50);
    expect(produto.id).toBe("123");
    expect(produto.nome).toBe("Board Game");
    expect(produto.preco).toBe(200.50);
  });

  it("não deve permitir a criação de produto com nome vazio", () => {
    expect(() => Produto.criar("123", "", 200)).toThrow("O nome do produto não pode ser vazio");
  });

  it("não deve permitir a criação de produto com preço zero ou negativo", () => {
    expect(() => Produto.criar("123", "Catan", -10)).toThrow("O preço do produto deve ser maior que zero");
  });
});