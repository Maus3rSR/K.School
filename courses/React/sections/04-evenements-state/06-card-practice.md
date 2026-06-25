---
layout: two-cols-header
layoutClass: gap-x-4
---

<script setup lang="ts">
import { ref } from 'vue'
const name = ref<string>('Ada')
</script>

# Exercice guidé — Carte de visite

À vous de jouer

::left::

```tsx
import { useState } from 'react'

function NameCard() {
  // 1. Déclarer le state avec "Ada"

  return (
    <div>
      <p>Bonjour, {/* afficher le state */} !</p>
      <button onClick={/* changer le nom */}>
        Changer
      </button>
      <button onClick={/* effacer le nom */}>
        Effacer
      </button>
    </div>
  )
}
```

<div>
  <p>Bonjour, {{ name }} !</p>
  <button @click="name = 'Alan'">Changer</button>
  <button class="ml-4" @click="name = ''">Effacer</button>
</div>

::right::

**À faire ensemble**

<v-click>

1. Déclarer `const [name, setName] = useState<string>("Ada")`
2. Afficher `{name}` dans le `<p>`
3. "Changer" → `setName("Alan")`
4. "Effacer" → `setName("")`

</v-click>

<v-click>

**Solution**

```tsx
const [name, setName] = useState<string>("Ada")

<p>Bonjour, {name} !</p>
<button onClick={() => setName("Alan")}>Changer</button>
<button onClick={() => setName("")}>Effacer</button>
```

</v-click>

<!--
Laisser 5-7 minutes de pratique avant de révéler la solution.
State string minimal — aucun conditionnel, aucune logique, setter avec valeur fixe.
Si blocage : "Quelle valeur veut-on mettre dans le state ?" → pointer vers useState et setName.
-->
