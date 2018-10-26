import { triggerWatchers } from "../utils/watch"

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
