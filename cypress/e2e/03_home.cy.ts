/// <reference types="cypress" />
describe("03 - Home", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("input[name='email']").type("e2etest@gmail.com");
    cy.get("input[name='password']").type("123456");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/home");
  });

  it("muestra el nombre del usuario en el saludo", () => {
    cy.contains("Hola").should("be.visible");
  });

  it("muestra los accesos rápidos al catálogo, carrito y perfil", () => {
    cy.contains("Catálogo").should("be.visible");
    cy.contains("Mi Carrito").should("be.visible");
    cy.contains("Mi Perfil").should("be.visible");
  });

  it("navega al catálogo al hacer clic en Ver colección", () => {
    cy.contains("Ver colección").first().click();
    cy.url().should("include", "/catalog");
  });

  it("el navbar muestra el nombre de la tienda clickeable", () => {
    cy.get("nav").contains("DRAJB Store").should("be.visible");
    cy.get("nav").contains("DRAJB Store").click();
    cy.url().should("include", "/home");
  });
});