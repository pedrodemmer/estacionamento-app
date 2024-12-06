describe("Testar validação de data de validade do cartão de crédito", () => {
  it("Deve exibir erro para data de validade inválida", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhdmVsaW5vc2FudG9zMDlAZ21haWwuY29tIiwiaWF0IjoxNzMzNDUwMzE3LCJleHAiOjE3MzM0NTM5MTd9.haaBOu9ho4nt2fmHXjxuch0wu3mJApDknGrakY7k_IE";
    cy.window().then((window) => {
      window.localStorage.setItem("token", token);
    });

    cy.visit("http://localhost:3000/vaga?numero=003");

    cy.wait(1000);
    cy.get("#veiculo")
      .select("Gol");
    cy.get("#confirm-button").click();

    cy.get("#creditCard")
      .type("4111 1111 1111 1111");

    cy.get("#creditCardHolder")
      .type("John Doe");

    cy.get("#cvv")
      .type("123");

    cy.get("#expirationDate")
      .type("13/25");
    cy.get("#confirm-payment-button").click();
    cy.get(".text-red-500").should("contain", "Data de validade inválida.");

    cy.get("#expirationDate")
      .clear()
      .type("01/20");
    cy.get("#confirm-payment-button").click();
    cy.get(".text-red-500").should(
      "contain",
      "Data de validade não pode ser anterior ao mês atual."
    );

    cy.get("#expirationDate")
      .clear()
      .type("2025/12");
    cy.get("#confirm-payment-button").click();
    cy.get(".text-red-500").should("contain", "Data de validade inválida.");
  });
});
