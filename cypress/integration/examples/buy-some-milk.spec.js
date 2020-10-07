describe('buy-some-milk', () => {

    beforeEach(() => {
        cy.seedAndVisit([])
    })

    it.only('focuses input on load', () => {
        cy.focused()
            .should('have.class', 'new-todo')
    })

    it('access input', () => {
        const typedText = 'buy some milk';

        cy.get('.new-todo')
            .type(typedText)
            .should('have.value', typedText)
    })

    context('Form submission', () => {
        it.only('Add a buy some milk', () => {
            const itemText = 'buy some milk'

            cy.route('POST', '/api/todos', {
                name: itemText,
                id: 1,
                isComplete: false
            })

            cy.get('.new-todo')
                .type(itemText)
                .type('{enter}')
                .should('have.value', '')

            cy.get('.todo-list li')
                .should('have.length', 1)
                .and('contain', itemText)
        })
    })
})