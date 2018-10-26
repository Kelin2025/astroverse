# Astroverse

Store based on structures

> **IN DEVELOPMENT**

## Installation

```
yarn add astroverse
```

## Usage (Vanilla)

```js
import { unit, list } from "astroverse"

export const star = unit("Star")
export const planet = unit("Planet")
export const planets = list(planet)
export const system = struct("System", {
  star,
  planets
})

const sunSystem = system({
  star: "Sun",
  planets: ["Earth", "Mars"]
})

sunSystem.watch(console.log)
sunSystem.planets.add("Venus")
// => { star: 'Sun', planets: ['Earth', 'Mars', 'Venus']}

sunSystem.star.update("Foobar")
// => { star: 'Foobar', planets: ['Earth', 'Mars', 'Venus']}
```

## Usage (React)

```js
import React from "React"
import { useData } from "astroverse/react"

import { planet, system } from "./structs"

const initialData = {
  star: "Sun",
  planets: ["Earth", "Mars"]
}

const View = () => {
  const [state, { planets }] = useData(system, initialData)

  return (
    <div>
      <h2>{state.star} system</h2>
      <ul>
        {state.planets.map((planet, idx) => (
          <li key={idx}>
            {planet} <button onClick={() => planets.remove(idx)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const AddPlanetForm = ({ value, onSubmit }) => {
  const [state, { update }] = useData(planet, value)

  const handleSubmit = evt => {
    evt.preventDefault()
    onSubmit(state)
    update("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={state} onChange={evt => update(evt.target.value)} />
    </form>
  )
}
```
