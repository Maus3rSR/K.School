---
layout: two-cols-header
layoutClass: gap-x-4
---

# Bonnes pratiques

Ce qu'on retient de cette séance

::left::

**Nommage**

```tsx
// ✅ Convention setter : setXxx
const [isOpen,   setIsOpen]   = useState(false)
const [username, setUsername] = useState("")
const [score,    setScore]    = useState(0)
```

<v-click>

**Un state = une responsabilité**

```tsx
// ❌ Trop de choses dans un seul state
const [ui, setUi] = useState({ modal: false, count: 0, name: "" })

// ✅ Chaque state a un rôle précis
const [isModalOpen, setIsModalOpen] = useState(false)
const [count,       setCount]       = useState(0)
const [name,        setName]        = useState("")
```

</v-click>

::right::

<v-click at="2">

**Typer dès le départ**

```tsx
// ✅ Toujours explicite si la valeur initiale est ambiguë
const [items, setItems] = useState<string[]>([])
const [user,  setUser]  = useState<User | null>(null)
```

</v-click>

<v-click>

**Handler inline ou nommé ?**

```tsx
// ✅ Inline pour les cas simples
<button onClick={() => setCount(count + 1)}>+</button>

// ✅ Nommé pour les cas complexes
function handleAddToCart() {
  setCount(count + 1)
  logAnalytics("add_to_cart")
  showToast("Ajouté !")
}
<button onClick={handleAddToCart}>Ajouter</button>
```

</v-click>

<!--
Insister sur "un state = une responsabilité" : facilite la lecture, le débogage et la maintenance.
Pour les tableaux et objets, toujours penser immutabilité (spread ou map) → anticipation S5.
Le handler nommé est préférable dès qu'il y a plusieurs lignes de logique.
-->
