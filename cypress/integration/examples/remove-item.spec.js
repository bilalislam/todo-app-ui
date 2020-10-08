describe('remove item', () => {

    beforeEach(() => {
        cy.seedAndVisit([{
            'id': 3,
            'name': 'rest for a while',
            'isCompleted': false
        }])
    })

    it.only('removes a todo item', () => {
        cy.route({
            url: 'tasks/3',
            method: 'DELETE',
            status: 200,
            response: {}
        })

        cy.get('.todo-list li')
            .first()
            .find('.destroy')
            .invoke('show')
            .click()
    })
})