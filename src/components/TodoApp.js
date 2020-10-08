import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { pipe, partial, findById, toggleItem, removeItem, updateItem, addItem, generateId } from '../lib/helper'
import { loadTodos, saveTodo, updateTodo, destroyTodo } from '../lib/service'


export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTodo: '',
      todos: []
    }

    this.handleNewTodoChange = this.handleNewTodoChange.bind(this)
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    loadTodos()
      .then(({ data }) => this.setState({ todos: data }))
      .catch(() => this.setState({ error: true }))
  }

  handleNewTodoChange(evt) {
    this.setState({ currentTodo: evt.target.value })
  }


  handleTodoSubmit(evt) {
    evt.preventDefault()
    const newTodo = { name: this.state.currentTodo, isComplete: false, id: generateId() }
    const updatedTodos = addItem(this.state.todos, newTodo)
    saveTodo(newTodo)
      .then(() => this.setState({
        todos: updatedTodos,
        currentTodo: ''
      }))
      .catch(() => this.setState({ error: true }))
  }

  handleToggle(id) {
    const getToggledTodo = pipe(findById, toggleItem)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateItem, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    updateTodo(updated)
      .then(() => {
        this.setState({ todos: updatedTodos })
      })
  }

  handleDelete(id) {
    destroyTodo(id)
      .then(() => {
        const updatedTodos = removeItem(this.state.todos, id)
        this.setState({ todos: updatedTodos })
      })
  }

  render() {
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todo app</h1>

            <TodoForm
              currentTodo={this.state.currentTodo}
              handleTodoSubmit={this.handleTodoSubmit}
              handleNewTodoChange={this.handleNewTodoChange} />

          </header>

          <section className="main">
            <TodoList todos={this.state.todos}
              handleDelete={this.handleDelete}
              handleToggle={this.handleToggle} />
          </section>
          <Footer />


        </div>
      </Router>
    )
  }
}
