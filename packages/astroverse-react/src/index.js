import React from "react"

export const useStore = function(store, memo) {
  const [state, set] = React.useState(store.getState(), memo)

  React.useEffect(function initWatcher() {
    const unsubscribe = store.watch(newState => {
      set(newState)
    })

    return function cleanup() {
      unsubscribe()
    }
  }, memo)

  return [state, store]
}

export const useNewStore = function useData(creator, initialState) {
  const store = React.useMemo(() => creator(initialState), [initialState])

  return useStore(store, initialState)
}
