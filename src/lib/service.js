import axios from 'axios'

export const loadTodos = () =>
    axios.get('http://localhost:3000/api/todos')

export const saveTodo = (todo) =>
    axios.post('http://localhost:3000/api/todos')

export const destroyTodo = (id) =>
    axios.delete(`http://localhost:3000/api/todos/${id}`)

export const updateTodo = (todo) =>
    axios.put(`http://localhost:3000/api/todos/${todo.id}`, todo)


// export const loadTodos = () => {
//     return fetch("http://localhost:3030/api/todos")
//         .then(res => res.json())
// }

// export const saveTodo = (todo) => {
//     return fetch(baseUrl, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(todo)
//     }).then(res => res.json())
// }

// export const updateTodo = (todo) => {
//     return fetch(`${baseUrl}/${todo.id}`, {
//         method: 'PUT',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(todo)
//     }).then(res => res.json())
// }

// export const destroyTodo = (id) => {
//     return fetch(`${baseUrl}/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     })
//   }