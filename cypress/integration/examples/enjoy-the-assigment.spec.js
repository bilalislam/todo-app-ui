describe('enjoy the assignment', () => {

    beforeEach(() => {
        cy.seedAndVisit()
    })

    it('add new input', () => {
        const itemText = 'enjoy the assignment'

        cy.server()
        cy.route('POST', '/tasks', {
            name: itemText,
            id: 2,
            isComplete: false
        })

        cy.get('.new-todo')
            .type(itemText)
            .type('{enter}')
            .should('have.value', '')
    })
})