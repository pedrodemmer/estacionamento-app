describe('Teste de Exclusão do Último Veículo', () => {
    it('Deve apagar o último veículo da tabela e verificar se foi removido', () => {

      cy.intercept('DELETE', '/api/veiculos/**').as('deleteVehicle');
      cy.intercept('GET', '/api/veiculos').as('getVehicles');
  

      cy.visit('http://localhost:3000/veiculos');
      cy.wait('@getVehicles').then((interception) => {
        cy.log(JSON.stringify(interception.response.body));
      });

      cy.get('table tr').last().within(() => {
        cy.get('button.text-red-500').click(); // Botão de exclusão
      });
  
      cy.get('.fixed.inset-0').should('be.visible'); // Modal
      cy.get('#confirm-button').click();
      cy.wait('@getVehicles');
  
      cy.get('table tr').last().should('not.contain', 'ID do veículo');
    });
  });
  