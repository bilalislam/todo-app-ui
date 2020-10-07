import { addItem, findById, toggleItem, updateItem, removeItem } from './helper'

test('addItem should add the passed todo to the list', () => {
    const startTodos = [
        { id: 1, name: 'buy some milk', isComplete: false },
        { id: 2, name: 'enjoy the assigment', isComplete: false }
    ]
    const newTodo = { id: 3, name: 'rest for a while', isComplete: false }
    const expected = [
        { id: 1, name: 'buy some milk', isComplete: false },
        { id: 2, name: 'enjoy the assigment', isComplete: false },
        { id: 3, name: 'rest for a while', isComplete: false }
    ]

    const result = addItem(startTodos, newTodo)
    expect(result).toEqual(expected)
})

test('addItem should not mutate the existing todo array', () => {
    const startTodos = [
        { id: 1, name: 'buy some milk', isComplete: false },
        { id: 2, name: 'enjoy the assigment', isComplete: false }
    ]
    const newTodo = { id: 3, name: 'rest for a while', isComplete: false }

    const result = addItem(startTodos, newTodo)

    expect(result).not.toBe(startTodos)

})

test('findById should return the expected item from an array', () => {
    const startTodos = [
        { id: 1, name: 'buy some milk', isComplete: false },
        { id: 2, name: 'enjoy the assigment', isComplete: false }
    ]
    const expected = { id: 2, name: 'enjoy the assigment', isComplete: false }
    const result = findById(2, startTodos)
    expect(result).toEqual(expected)
})

test('toggleItem should toggle the isComplete prop of a todo', () => {
    const startTodo = { id: 2, name: 'buy some milk', isComplete: false }
    const expected = { id: 2, name: 'buy some milk', isComplete: true }
    const result = toggleItem(startTodo)
    expect(result).toEqual(expected)
})

test('toggleItem should not mutate the original todo', () => {
    const startTodo = { id: 2, name: 'buy some milk', isComplete: false }
    const result = toggleItem(startTodo)
    expect(result).not.toBe(startTodo)
})

test('updateItem should update an item by id', () => {
    const startTodos = [
        { id: 1, name: 'buy some milk', isComplete: false },
        { id: 2, name: 'enjoy the assigment', isComplete: false }
    ]
    const updatedTodo = { id: 1, name: 'buy some milk', isComplete: true }
    const expected = [
        { id: 1, name: 'buy some milk', isComplete: true },
        { id: 2, name: 'enjoy the assigment', isComplete: false }
    ]

    const result = updateItem(startTodos, updatedTodo)
    expect(result).toEqual(expected)
})

test('updateItem should not mutate the original array', () => {
    const startTodos = [
        { id: 1, name: 'buy some milk', isComplete: false },
        { id: 2, name: 'enjoy the assigment', isComplete: false }
    ]
    const updatedTodo = { id: 1, name: 'buy some milk', isComplete: true }
    const result = updateItem(startTodos, updatedTodo)

    expect(result).not.toBe(startTodos)
})

test('removeItem should remove an item by id', () => {
    const startTodos = [
        { id: 1, name: 'buy some milk', isComplete: false },
        { id: 2, name: 'enjoy the assigment', isComplete: false },
        { id: 3, name: 'rest for a while', isComplete: false }
    ]
    const targetId = 2
    const expectedTodos = [
        { id: 1, name: 'buy some milk', isComplete: false },
        { id: 3, name: 'rest for a while', isComplete: false }
    ]
    const result = removeItem(startTodos, targetId)

    expect(result).toEqual(expectedTodos)
})

test('removeItem should not mutate the original array', () => {
    const startTodos = [
        { id: 1, name: 'buy some milk', isComplete: false },
        { id: 2, name: 'enjoy the assigment', isComplete: false },
        { id: 3, name: 'rest for a while', isComplete: false }
    ]
    const targetId = 2
    const result = removeItem(startTodos, targetId)

    expect(result).not.toBe(startTodos)
})