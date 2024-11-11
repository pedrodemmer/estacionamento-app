describe("Home Page Vaga Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Deve exibir um dropdown com informação resumida da vaga", () => {
    cy.get("#inputNumber").type("48{enter}");

    cy.get(".absolute.mt-2.w-56.bg-white").should("be.visible");
  });

  it("Redirecionar para a página de tarifas e períodos quando clicado em Tarifas e Periodos", () => {
    cy.get("#inputNumber").type("48{enter}");

    cy.get(".absolute.mt-2.w-56.bg-white")
      .should("be.visible")
      .within(() => {
        cy.get('a[href="/vaga"]').click();
      });

    cy.url().should("include", "/vaga");
  });
});
