# Astroverse

Store based on structures

> **IN DEVELOPMENT**

## Installation

```
yarn add astroverse astroverse-react
```

## Usage (Vanilla)

```js
import { unit, struct, list } from "astroverse"

export const star = unit("Star")
export const planet = unit("Planet")
export const planets = list(planet)
export const system = struct("System", {
  star,
  planets
})

const solarSystem = system({
  star: "Sun",
  planets: ["Earth", "Mars"]
})

solarSystem.watch(console.log)
solarSystem.planets.add("Venus")
// => { star: 'Sun', planets: ['Earth', 'Mars', 'Venus']}

solarSystem.star.update("Foobar")
// => { star: 'Foobar', planets: ['Earth', 'Mars', 'Venus']}
```

## Usage (React)

```js
import React from "React"
import { useNewStore } from "astroverse-react"

import { planet, system } from "./structs"

const initialData = {
  star: "Sun",
  planets: ["Earth", "Mars"]
}

const View = () => {
  const [state, { planets }] = useNewStore(system, initialData)

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
  const [state, { update }] = useNewStore(planet, value)

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
