export const generateStruct = (schema, state) =>
  Object.entries(schema).reduce((res, [key, creator]) => {
    res[key] = creator(state[key])

    return res
  }, {})

export const getStructState = units =>
  Object.entries(units).reduce((res, [key, unit]) => {
    res[key] = unit.getState()
    return res
  }, {})
