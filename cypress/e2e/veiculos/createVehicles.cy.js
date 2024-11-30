describe('Teste de Adicionar Veículo', () => {
    it('Deve adicionar um veículo e verificar se ele aparece na tabela', () => {
      
      cy.intercept('POST', '/api/veiculos').as('addVehicle');
      cy.intercept('GET', '/api/veiculos').as('getVehicles');
      cy.visit('http://localhost:3000');

      cy.contains('Meus Veículos').click();
      cy.url().should('include', '/veiculos');
      cy.wait('@getVehicles');

      cy.get('#add-vehicle-button').click();
      cy.url().should('include', '/adicionar-veiculo');
      cy.get('input[placeholder="Placa do Veículo"]').type('POU4S45');
      cy.get('input[placeholder="Apelido do Veículo"]').type('Mustang');

      cy.get('#confirm-button').click();
      cy.url().should('include', '/veiculos');
      cy.wait('@getVehicles');

      cy.get('table tbody tr').should('contain', 'POU4S45').and('contain', 'Mustang');
    });
  });
  
  