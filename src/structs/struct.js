import { triggerWatchers } from "../utils/watch"
import { generateStruct, generateStructState } from "../utils/generate"

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
