/// <reference types="cypress" />
describe("04 - Catálogo y detalle de producto", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("input[name='email']").type("e2etest@gmail.com");
    cy.get("input[name='password']").type("123456");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/home");
    cy.visit("/catalog");
  });

  it("carga y muestra productos en el catálogo", () => {
    cy.contains("Catálogo").should("be.visible");
    cy.get(".group").should("have.length.greaterThan", 0);
  });

  it("filtra productos por diseño", () => {
    cy.get("select").first().select("Montañas");
    cy.contains("Montañas").should("be.visible");
  });

  it("navega al detalle del producto al hacer clic en una tarjeta", () => {
    cy.get(".group").first().click();
    cy.url().should("include", "/product/");
    cy.contains("Agregar al carrito").should("be.visible");
  });

  it("permite seleccionar una talla en el detalle del producto", () => {
    cy.get(".group").first().click();
    cy.url().should("include", "/product/");
    cy.get("button").contains("M").click();
    cy.get("button").contains("M").should("be.visible");
    cy.contains("Agregar al carrito").should("be.visible");
  });
});
