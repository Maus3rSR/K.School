---
layout: two-cols-header
layoutClass: gap-x-4
---

# useRef <small>(🪝 Hook React)</small>

Une valeur qui survit aux re-rendus sans en déclencher un nouveau

::left::

````md magic-move
```tsx
// ❌ Problème : on perd l'id du timer entre les rendus
function Chrono() {
  let timerId: number // réinitialisé à chaque rendu !

  function start() {
    timerId = setInterval(() => console.log('tic'), 1000)
  }

  function stop() {
    clearInterval(timerId) // timerId est undefined ici
  }

  return (
    <>
      <button onClick={start}>▶ Démarrer</button>
      <button onClick={stop}>⏹ Stopper</button>
    </>
  )
}
```

```tsx
// ✅ useRef garde la valeur entre les rendus, sans re-rendu
import { useRef } from 'react'

function Chrono() {
  const timerRef = useRef<number | null>(null)

  function start() {
    timerRef.current = setInterval(() => console.log('tic'), 1000)
  }

  function stop() {
    clearInterval(timerRef.current!) // l'id est toujours là
    timerRef.current = null
  }

  return (
    <>
      <button onClick={start}>▶ Démarrer</button>
      <button onClick={stop}>⏹ Stopper</button>
    </>
  )
}
```
````

::right::

<v-click>

```tsx
const timerRef = useRef<number | null>(null)
//                                     ^valeur initiale

timerRef.current // lecture et écriture
```

</v-click>

<div v-click class="text-sm">

**useState vs useRef**

| | `useState` | `useRef` |
|---|---|---|
| Déclenche un re-rendu | ✅ oui | ❌ non |
| Survit aux re-rendus | ✅ oui | ✅ oui |
| Afficher dans le JSX | ✅ | ❌ (ne se met pas à jour) |
| Stocker un id de timer | ❌ inutile | ✅ |

</div>

<!--
Le problème concret : une variable locale (let timerId) est réinitialisée à chaque rendu.
Un useState déclencherait un re-rendu inutile à chaque start/stop.
useRef est la bonne solution : la valeur survit, mais ne provoque rien.
Piège à anticiper : un apprenant voudra afficher timerRef.current dans le JSX — expliquer que ça ne se mettra pas à jour à l'écran puisque rien ne déclenche de re-rendu.
Le vrai cas d'usage "accès au DOM" arrive dans la slide suivante.
-->
