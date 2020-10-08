describe('item mark as incomplete', () => {
    beforeEach(() => {
        cy.seedAndVisit([{
            "id": 1,
            "name": "buy some milk",
            "isComplete": true
        }])
    })

    it.only('Marks item as incomplete', () => {
        cy.fixture('todos')
            .then(todos => {
                const target = Cypress._.head(todos)
                cy.route(
                    'PUT',
                    `/tasks/${target.id}`,
                    Cypress._.merge(target, { isComplete: false })
                )
            })

        cy.get('.todo-list li')
            .first()
            .as('first-todo')

        cy.get('@first-todo')
            .find('.toggle')
            .click()
            .should('not.be.checked')
    })
})
