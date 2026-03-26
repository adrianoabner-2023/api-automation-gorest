describe('Automação de API - GoRest', () => {

    it('Deve criar um usuário com sucesso', () => {
        // Voltamos para Cypress.env, mas dentro do 'it'
        const token = Cypress.env('TOKEN');

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                "name": "Abner Venancio",
                "gender": "male",
                "email": `teste_${Date.now()}@gmail.com`,
                "status": "active"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it('Deve retornar erro devido ao campo status estar preenchido incorretamente', () => {
        const token = Cypress.env('TOKEN');

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                "name": "Abner Venancio",
                "gender": "male",
                "email": `teste_${Math.random()}@gmail.com`,
                "status": "Testing"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it('Deve retornar erro de autorização se o token for inválido', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                // GoRest retorna 401 se o token for inválido 
                // ou 403 se o formato do Bearer estiver errado
                Authorization: `Bearer token_totalmente_errado`
            },
            body: {
                "name": "Abner Venancio",
                "gender": "male",
                "email": "adrianoabner7@gmail.com",
                "status": "active"
            },
            failOnStatusCode: false
        }).then((response) => {
            // Ajustamos para aceitar 401 ou 403, pois depende da regra da API
            expect([401, 403]).to.include(response.status);
        });
    });
});