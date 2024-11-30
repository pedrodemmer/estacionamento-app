describe('Teste de Adicionar Veículo', () => {
    it('Deve adicionar um veículo e verificar se ele aparece na tabela', () => {
      // Intercepta a API para adicionar veículo
      cy.intercept('POST', '/api/veiculos').as('addVehicle');
  
      // Intercepta a API para carregar veículos
      cy.intercept('GET', '/api/veiculos').as('getVehicles');
  
      // Visita a página inicial
      cy.visit('http://localhost:3000');
  
      // Clica em "Meus Veículos"
      cy.contains('Meus Veículos').click();
  
      // Aguarda o carregamento da página /veiculos
      cy.url().should('include', '/veiculos');
      cy.wait('@getVehicles');
  
      // Clica no botão "Adicionar Veículo"
      cy.get('#add-vehicle-button').click();
  
      // Aguarda o redirecionamento para /adicionar-veiculo
      cy.url().should('include', '/adicionar-veiculo');
  
      // Preenche o formulário
      cy.get('input[placeholder="Placa do Veículo"]').type('POU4S45');
      cy.get('input[placeholder="Apelido do Veículo"]').type('Mustang');
  
      // Clica no botão confirmar
      cy.get('#confirm-button').click();
  
      // Aguarda o redirecionamento de volta para /veiculos
      cy.url().should('include', '/veiculos');
  
      // Aguarda a API para verificar os veículos
      cy.wait('@getVehicles');
  
      // Verifica se o veículo foi adicionado à tabela
      cy.get('table tbody tr').should('contain', 'POU4S45').and('contain', 'Mustang');
    });
  });
  