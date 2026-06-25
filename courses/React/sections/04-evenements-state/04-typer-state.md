---
layout: two-cols-header
layoutClass: gap-x-4
---

# Typer le state avec TypeScript

useState&lt;T&gt; — le générique qui sécurise l'état

::left::

**Type inféré automatiquement**

```tsx
// TypeScript déduit number
// depuis la valeur initiale
const [count, setCount] = useState(0)

// TypeScript déduit string
// depuis la valeur initiale
const [name, setName] = useState("")
```

<v-click>

**Type explicite (recommandé)**

```tsx
const [count, setCount] 
    = useState<number>(0)

const [name, setName] 
    = useState<string>("")
    
const [isOpen, setIsOpen] 
    = useState<boolean>(false)
```

</v-click>

::right::

<v-click at="2">

**Quand le type explicite est indispensable**

```tsx
// Sans valeur initiale → TypeScript ne peut pas inférer
const [user, setUser] = useState<User | null>(null)
//                               ^^^^^^^^^^^
//                               string | null ne suffit pas
```

</v-click>

<v-click>

**Protection TypeScript en action**

```tsx
const [count, setCount] = useState<number>(0)

setCount("hello")  // ❌ Argument of type 'string' is
                   //    not assignable to type 'number'
setCount(42)       // ✅
```

</v-click>

<!--
L'inférence automatique fonctionne dans la plupart des cas simples.
Le type explicite devient obligatoire dès qu'on a une union (User | null) ou un tableau ([]).
Montrer l'erreur TypeScript en live : tenter setCount("hello") dans Monaco → rouge immédiat.
-->
