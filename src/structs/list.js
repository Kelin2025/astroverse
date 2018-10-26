import { triggerWatchers } from "../utils/watch"

export const list = struct => (initialState = []) => {
  let units = initialState.map(item => struct(item))
  let state = units.map(unit => unit.getState())
  const { addWatcher, triggerWatchers } = generateWatch(() => state)

  const add = (value, cb) => {
    const instance = struct(value)
    units.push(instance)
    state = [...state]
    state.push(instance.getState())
    if (cb) {
      cb(state)
    }
    triggerWatchers()
  }

  const update = (value, cb) => {
    units = initialState.map(item => struct(item))
    state = units.map(unit => unit.getState())
    if (cb) {
      cb(state)
    }
    triggerWatchers()
  }

  const remove = (idx, cb) => {
    units.splice(idx, 1)
    state = [...state]
    state.splice(idx, 1)
    if (cb) {
      cb(state)
    }
    triggerWatchers()
  }

  return {
    type: "list",
    name: struct.name,
    getState: () => state,
    add,
    update,
    remove,
    reset: () => update(initialState),
    watch: addWatcher
  }
}
