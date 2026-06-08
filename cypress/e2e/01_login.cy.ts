/// <reference types="cypress" />
describe("01 - Login", () => {
  it("muestra el formulario de login correctamente", () => {
    cy.visit("/login");
    cy.contains("Iniciar sesión").should("be.visible");
    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
  });

  it("muestra error con credenciales incorrectas", () => {
    cy.visit("/login");
    cy.get("input[name='email']").type("noexiste@test.com");
    cy.get("input[name='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();
    cy.contains("Credenciales inválidas").should("be.visible");
  });

  it("inicia sesión correctamente y redirige al home", () => {
    cy.visit("/login");
    cy.get("input[name='email']").type("e2etest@gmail.com");
    cy.get("input[name='password']").type("123456");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/home");
    cy.contains("Hola").should("be.visible");
  });
});