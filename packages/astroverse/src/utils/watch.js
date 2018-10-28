export const generateWatch = getState => {
  const watchers = []

  const addWatcher = cb => {
    watchers.push(cb)

    cb(getState())

    return function unsubscribe() {
      watchers.splice(watchers.indexOf(cb), 1)
    }
  }

  const triggerWatchers = (...payload) => {
    watchers.forEach(watcher => watcher(getState(), ...payload))
  }

  return { addWatcher, triggerWatchers }
}
