describe('Teste de navegação com botão de voltar', () => {
  it('Deve redirecionar para a página inicial ao clicar no botão voltar', () => {
    cy.visit("http://localhost:3000/editar-veiculo");
    cy.get('#back-button').should('be.visible');
    cy.get('#back-button').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
