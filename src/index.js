import { triggerWatchers } from "../utils/watch"
import { generateStruct, generateStructState } from "../utils/generate"

export const unit = name => (initialState = null) => {
  let state = initialState
  const { addWatcher, triggerWatchers } = generateWatch(() => state)

  const update = (newState, cb) => {
    if (state === newState) {
      return
    }
    state = newState
    if (cb) {
      cb(state)
    }
    triggerWatchers()
  }

  return {
    type: "unit",
    name,
    getState: () => state,
    update,
    reset: () => update(initialState),
    watch: addWatcher
  }
}

export const struct = (name, schema) => (initialState = {}) => {
  let units = generateStruct(schema, initialState)
  let state = getStructState(units)
  const { addWatcher, triggerWatchers } = generateWatch(() => state)

  const update = (newState, cb) => {
    if (state === newState) {
      return
    }
  }

  Object.entries(units).forEach(([key, unit]) => {
    unit.watch(newValue => {
      if (state[key] !== newValue) {
        state = { ...state }
        state[key] = newValue
        triggerWatchers()
      }
    })
  })

  const res = {
    type: "struct",
    name,
    getState: () => state,
    update,
    reset: () => update(initialState),
    watch: addWatcher
  }

  Object.entries(units).forEach(([key, unit]) => {
    res[key] = unit
  })

  return res
}

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
