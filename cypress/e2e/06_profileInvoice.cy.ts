/// <reference types="cypress" />
describe("06 - Perfil y factura", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("input[name='email']").type("e2etest@gmail.com");
    cy.get("input[name='password']").type("123456");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/home");
  });

  it("muestra la página de perfil con los datos del usuario", () => {
    cy.visit("/profile");
    cy.contains("Mi Perfil").should("be.visible");
    cy.contains("Datos personales").should("be.visible");
  });

  it("activa el modo edición al hacer clic en Editar", () => {
    cy.visit("/profile");
    cy.contains("Editar").click();
    cy.contains("Guardar cambios").should("be.visible");
    cy.contains("Cancelar").should("be.visible");
  });

  it("muestra error si intenta guardar sin contraseña", () => {
    cy.visit("/profile");
    cy.contains("Editar").click();
    cy.contains("Guardar cambios").click();
    cy.contains("Debes ingresar tu contraseña").should("be.visible");
  });

  it("la página de factura sin estado muestra mensaje de error", () => {
    cy.visit("/invoice");
    cy.contains("No hay factura para mostrar").should("be.visible");
    cy.contains("Ir al catálogo").should("be.visible");
  });

  it("el footer muestra el copyright y redes sociales", () => {
    cy.visit("/home");
    cy.contains("© 2026 Aplicación Web. Todos los derechos reservados.").should("be.visible");
    cy.contains("Facebook").should("be.visible");
    cy.contains("Instagram").should("be.visible");
  });
});