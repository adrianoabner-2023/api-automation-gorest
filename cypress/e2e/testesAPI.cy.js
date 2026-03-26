describe('Automação de API - GoRest', () => {

    // É boa prática deixar o token em uma variável ou no cypress.env.json
    const token = Cypress.env('TOKEN');

    it('Deve criar um usuário com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users', // Atualizei para v2 que é a mais comum
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                "name": "Abner Venancio",
                "gender": "male",
                "email": `teste_${Math.random()}@gmail.com`, // Email dinâmico para não dar erro de "já existe"
                "status": "active"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201); // GoRest retorna 201 para criação
            expect(response.body).to.have.property('id');
            expect(response.duration).to.be.lessThan(2000);
        });
    });
    it('Deve retornar erro devido ao campo status está prenchido incorretamente', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users', // Atualizei para v2 que é a mais comum
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                "name": "Abner Venancio",
                "gender": "male",
                "email": `teste_${Math.random()}@gmail.com`, // Email dinâmico para não dar erro de "já existe"
                "status": "Testing"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.duration).to.be.lessThan(2000);
        })
    })



    it('Deve retornar erro de autorização se o token for inválido', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: `6663f8ff0493e01f14547611db29420e828b341bc9b89af5619ca8bdc313d5638923`
            },
            body: {
                "name": "Abner Venancio",
                "gender": "male",
                "email": "adrianoabner7@gmail.com",
                "status": "active"
            },
            failOnStatusCode: false
        }).then((response) => {
            // Se o token estiver errado, o status esperado é 401
            expect(response.status).to.eq(401);
        });
    });
});