export const partial = (fn, ...args) => fn.bind(null, ...args)
const _pipe = (f, g) => (...args) => g(f(...args))
export const pipe = (...fns) => fns.reduce(_pipe)

export const addItem = (list, item) => [...list, item]
export const findById = (id, list) => list.find(item => item.id === id)
export const toggleItem = (todo) => ({ ...todo, isComplete: !todo.isComplete })
export const updateItem = (list, updated) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id)
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ]
}

export const removeItem = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex + 1)
  ]
}