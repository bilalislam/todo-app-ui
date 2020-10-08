import axios from 'axios'

const baseUrl = 'http://localhost:8080';

export const loadTodos = () =>
    axios.get(baseUrl + '/tasks')

export const saveTodo = (todo) => {
    return fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(res => res.json())
}

export const updateTodo = (todo) => {
    return fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(res => res.json())
}

export const destroyTodo = (id) => {
    return fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}