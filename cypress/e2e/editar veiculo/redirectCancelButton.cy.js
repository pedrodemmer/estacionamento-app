describe("Teste de navegação com botão de cancelar", () => {
  it("Deve redirecionar para a página inicial ao clicar no botão Cancelar", () => {
    cy.visit("http://localhost:3000/editar-veiculo");
    cy.get("#cancel-button").should("have.value", "Cancelar").should("be.visible");
    cy.get("#cancel-button").should("have.value", "Cancelar").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
