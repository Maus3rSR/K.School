---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice guidé — Chronomètre

Combiner useEffect, cleanup et useRef

::left::

```tsx
function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // 1. useEffect au montage : focus automatique
  //    sur inputRef

  // 2. useEffect au montage : setInterval qui
  //    incrémente seconds chaque seconde,
  //    avec cleanup (clearInterval)

  return (
    <div>
      <p>{seconds}s</p>
      <input ref={inputRef} placeholder="Note..." />
    </div>
  )
}
```

::right::

**À faire ensemble**

<v-click>

1. `useEffect(() => { inputRef.current?.focus() }, [])`
2. `useEffect(() => { const id = setInterval(...); return () => clearInterval(id) }, [])`

</v-click>

<v-click>

**Solution**

```tsx
useEffect(() => {
  inputRef.current?.focus()
}, [])

useEffect(() => {
  const id = setInterval(() => {
    setSeconds((s) => s + 1)
  }, 1000)
  return () => clearInterval(id)
}, [])
```

</v-click>

<!--
Deux useEffect séparés, chacun avec une seule responsabilité — insister sur ce principe plutôt que de tout mettre dans un seul Effet.
setSeconds((s) => s + 1) : mentionner brièvement la forme fonctionnelle du setter si un apprenant demande pourquoi seconds n'est pas dans le tableau de dépendances — sans en faire un nouveau concept à part entière.
Vérifier en live que le compteur s'arrête bien si on démonte le composant (via un bouton toggle par exemple).
-->
