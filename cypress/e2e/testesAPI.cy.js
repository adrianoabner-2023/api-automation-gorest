describe('Automação de API - GoRest', () => {

    it('Deve criar um usuário com sucesso', () => {
        // Usando cy.env() que é o padrão recomendado pela mensagem de erro
        const token = cy.env('TOKEN');

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
        const token = cy.env('TOKEN');

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
                Authorization: `Bearer token_invalido_123`
            },
            body: {
                "name": "Abner Venancio",
                "gender": "male",
                "email": "adrianoabner7@gmail.com",
                "status": "active"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});