/// <reference types="cypress" />
describe("02 - Registro de usuario", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.contains("Registrarse").click();
  });

  it("muestra el formulario de registro al cambiar de tab", () => {
    cy.get("input[name='firstName']").should("be.visible");
    cy.get("input[name='lastName']").should("be.visible");
    cy.get("input[name='phone']").should("be.visible");
    cy.get("input[name='address']").should("be.visible");
  });

  it("muestra error si los campos obligatorios están vacíos", () => {
    cy.get("button[type='submit']").click();
    cy.get("input[name='firstName']").should("have.attr", "required");
    cy.get("input[name='email']").should("have.attr", "required");
    cy.get("input[name='password']").should("have.attr", "required");
  });

  it("valida que el correo tenga formato correcto", () => {
    cy.get("input[name='firstName']").type("Test");
    cy.get("input[name='lastName']").type("User");
    cy.get("input[name='phone']").type("8888-8888");
    cy.get("input[name='address']").type("San José");
    cy.get("input[name='email']").type("correo-invalido");
    cy.get("input[name='password']").type("123456");
    cy.get("input[name='email']").should("have.attr", "type", "email");
    cy.get("input[name='email']").invoke("val").should("eq", "correo-invalido");
  });
});