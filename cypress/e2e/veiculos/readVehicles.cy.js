describe('Teste de Carregamento de Veículos', () => {
    it('Deve garantir que as informações da API são recebidas e exibidas na tabela', () => {

      cy.intercept('GET', '/api/veiculos', (req) => {
        req.continue((res) => {
          expect(res.statusCode).to.eq(200);
          expect(Array.isArray(res.body)).to.be.true;
  
          res.body.forEach((vehicle) => {
            expect(vehicle).to.have.property('placa');
            expect(vehicle).to.have.property('apelido');
          });
        });
      }).as('getVeiculos');

      cy.visit('http://localhost:3000');
      cy.contains('Meus Veículos').click();
      cy.url().should('include', '/veiculos');
      cy.wait('@getVeiculos');

      cy.get('table tbody tr').should('exist');
    });
  });
  