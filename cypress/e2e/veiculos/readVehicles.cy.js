describe('Teste de Carregamento de Veículos', () => {
    it('Deve garantir que as informações da API são recebidas e exibidas na tabela', () => {
      // Intercepta a chamada para a API /api/veiculos
      cy.intercept('GET', '/api/veiculos', (req) => {
        req.continue((res) => {
          // Valida a resposta da API (deve ser um status 200)
          expect(res.statusCode).to.eq(200);
  
          // Valida se os dados retornados são um array
          expect(Array.isArray(res.body)).to.be.true;
  
          // Valida que cada objeto no array possui os campos esperados
          res.body.forEach((vehicle) => {
            expect(vehicle).to.have.property('placa');
            expect(vehicle).to.have.property('apelido');
          });
        });
      }).as('getVeiculos');
  
      // Visita a página inicial
      cy.visit('http://localhost:3000');
  
      // Clica no botão/link "Meus Veículos"
      cy.contains('Meus Veículos').click();
  
      // Verifica se a URL foi atualizada corretamente
      cy.url().should('include', '/veiculos');
  
      // Aguarda a API de veículos ser carregada
      cy.wait('@getVeiculos');
  
      // Valida que a tabela não está vazia
      cy.get('table tbody tr').should('exist');
    });
  });
  