describe('item mark as completed', () => {
    beforeEach(() => {
        cy.seedAndVisit([{
            "id": 1,
            "name": "buy some milk",
            "isComplete": false
        }])
    })

    it.only('Marks item as complete', () => {
        cy.fixture('todos')
            .then(todos => {
                const target = Cypress._.head(todos)
                cy.route(
                    'PUT',
                    `/api/todos/${target.id}`,
                    Cypress._.merge(target, { isComplete: true })
                )
            })

        cy.get('.todo-list li')
            .first()
            .as('first-todo')

        cy.get('@first-todo')
            .find('.toggle')
            .click()
            .should('be.checked')

        cy.get('@first-todo')
            .should('have.class', 'completed')
    })
})
