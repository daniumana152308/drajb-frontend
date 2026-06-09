/// <reference types="cypress" />
describe("05 - Carrito de compras", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("input[name='email']").type("e2etest@gmail.com");
    cy.get("input[name='password']").type("123456");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/home");
  });

  it("muestra carrito vacío cuando no hay productos", () => {
    cy.visit("/cart");
    cy.contains("No has agregado nada aún").should("be.visible");
    cy.contains("Ver catálogo").should("be.visible");
  });

  it("agrega un producto al carrito desde el detalle", () => {
    cy.visit("/catalog");
    cy.get("[data-testid='product-card']").first().click();
    cy.url().should("include", "/product/");
    cy.get("button").contains("M").click();
    cy.contains("Agregar al carrito").click();
    cy.contains("Agregado al carrito").should("be.visible");
  });

  it("el contador del carrito se actualiza en el navbar", () => {
    cy.visit("/catalog");
    cy.get("[data-testid='product-card']").first().click();
    cy.get("button").contains("M").click();
    cy.contains("Agregar al carrito").click();
    cy.visit("/home");
    cy.get("nav").contains("Carrito").should("be.visible");
  });

  it("permite eliminar un producto del carrito", () => {
    cy.visit("/catalog");
    cy.get("[data-testid='product-card']").first().click();
    cy.get("button").contains("M").click();
    cy.contains("Agregar al carrito").click();
    cy.contains("Ver carrito").click();
    cy.url().should("include", "/cart");
    cy.contains("Eliminar").click();
    cy.contains("No has agregado nada aún").should("be.visible");
  });
});