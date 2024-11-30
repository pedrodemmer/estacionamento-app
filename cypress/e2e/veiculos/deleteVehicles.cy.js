describe('Teste de Exclusão do Último Veículo', () => {
    it('Deve apagar o último veículo da tabela e verificar se foi removido', () => {
      // Intercepta a requisição DELETE
      cy.intercept('DELETE', '/api/veiculos/**').as('deleteVehicle');
      cy.intercept('GET', '/api/veiculos').as('getVehicles');
  
      // Visita a página de veículos
      cy.visit('http://localhost:3000/veiculos');
  
      // Aguarda os dados serem carregados
      cy.wait('@getVehicles').then((interception) => {
        // Log para verificar os dados retornados
        cy.log(JSON.stringify(interception.response.body));
      });
  
      // Clica no botão de exclusão do último veículo da tabela
      cy.get('table tr').last().within(() => {
        cy.get('button.text-red-500').click(); // Clica no botão de exclusão
      });
  
      // Aguarda o modal aparecer e confirma a exclusão
      cy.get('.fixed.inset-0').should('be.visible'); // Espera o modal aparecer
      cy.get('#confirm-button').click(); // Clica no botão "Confirmar"
  
      // Aguarda a requisição GET para garantir que a lista foi atualizada
      cy.wait('@getVehicles');
  
      // Verifica se o último veículo foi removido da tabela
      cy.get('table tr').last().should('not.contain', 'ID do veículo'); // Verifique a presença do ID do veículo
    });
  });
  