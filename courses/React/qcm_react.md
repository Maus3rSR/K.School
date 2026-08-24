# QCM — React · TypeScript · Hooks · API · React Router

## Facile à moyen — Dans quel fichier JSX une expression JavaScript peut-elle être insérée dans le markup ?

-[ ] Entre des balises HTML classiques, sans syntaxe particulière
-[x] Entre accolades, par exemple `{user.name}`
-[ ] Entre crochets, par exemple `[user.name]`
-[ ] Dans un attribut `javascript`, par exemple `javascript={user.name}`

### Commentaire de correction

Les accolades permettent de repasser du JSX vers JavaScript. Elles servent aussi dans les attributs JSX, par exemple `src={user.imageUrl}`.

## Facile à moyen — Quelle écriture respecte les règles de nommage d'un composant React ?

-[ ] `function userCard() { return <article /> }`
-[x] `function UserCard() { return <article /> }`
-[ ] `function user-card() { return <article /> }`
-[ ] `const user-card = () => <article />`

### Commentaire de correction

Un composant React doit commencer par une majuscule afin d'être distingué d'une balise HTML native.

## Facile à moyen — Quel attribut permet d'appliquer une classe CSS à un élément JSX ?

-[ ] `class`
-[x] `className`
-[ ] `cssClass`
-[ ] `styleClass`

### Commentaire de correction

En JSX, l'attribut `class` du HTML s'écrit `className`, par exemple `<button className="primary">`.

## Facile à moyen — Quel code déclare un state numérique initialisé à zéro ?

```tsx
import { useState } from 'react'
```

-[ ] `const count = useState<number>(0)`
-[x] `const [count, setCount] = useState<number>(0)`
-[ ] `const { count, setCount } = useState<number>(0)`
-[ ] `const [count] = setState<number>(0)`

### Commentaire de correction

`useState` retourne un tableau contenant la valeur actuelle et sa fonction de mise à jour. La déstructuration `[count, setCount]` est la convention attendue.

## Facile à moyen — Quelle propriété est indispensable pour rendre une liste de composants avec `map()` ?

```tsx
const colors = ['red', 'blue']

return colors.map((color) => (
  <li key={/* ... */}>{color}</li>
))
```

-[ ] `id`, avec une valeur identique pour chaque élément
-[x] `key`, avec une valeur stable et unique parmi les frères
-[ ] `index`, obligatoirement transmis comme prop
-[ ] `name`, avec le nom du tableau

### Commentaire de correction

`key` aide React à identifier chaque élément entre deux rendus. Elle doit être stable et unique dans la liste concernée.

## Facile à moyen — Quel composant configure le routeur principal d'une SPA avec React Router ?

-[ ] `RouterView`
-[x] `BrowserRouter`
-[ ] `PageRouter`
-[ ] `NavigationProvider`

### Commentaire de correction

`BrowserRouter` fournit le contexte de navigation basé sur l'URL du navigateur. Les routes sont ensuite déclarées avec `Routes` et `Route`.

## Facile à moyen — Dans quel dossier un projet créé avec Vite et le template `react-ts` place-t-il généralement les composants applicatifs ?

-[ ] `node_modules/`
-[ ] `public/`
-[x] `src/`
-[ ] `.github/`

### Commentaire de correction

Le dossier `src/` contient le code source de l'application, notamment les composants `.tsx`. `public/` contient principalement des ressources statiques.

## Moyen à difficile — Quelles affirmations décrivent correctement le passage de données entre composants ? (plusieurs réponses possibles)

```tsx
type ProductCardProps = {
  name: string
  price?: number
  children?: React.ReactNode
}

function ProductCard({ name, price = 0, children }: ProductCardProps) {
  return <article>{children}<h2>{name}</h2><p>{price} €</p></article>
}
```

-[x] Les props descendent du parent vers l'enfant.
-[x] `price` est optionnelle et prend `0` par défaut dans ce composant.
-[x] `children` permet de composer du contenu entre les balises du composant.
-[ ] L'enfant peut modifier directement l'objet `props` reçu.

### Commentaire de correction

Les props sont en lecture seule et suivent un flux unidirectionnel parent → enfant. Le destructuring permet ici de définir une valeur par défaut, tandis que `children` reçoit le contenu imbriqué.

## Moyen à difficile — Quelles mises à jour de state produisent correctement `3` après trois clics rapides ? (plusieurs réponses possibles)

```tsx
const [score, setScore] = useState(0)
```

-[ ] `setScore(score + 1); setScore(score + 1); setScore(score + 1)`
-[x] `setScore((current) => current + 1); setScore((current) => current + 1); setScore((current) => current + 1)`
-[x] `setScore((current) => current + 3)`
-[ ] `score += 3`

### Commentaire de correction

Pendant un rendu, `score` est une valeur figée dans ce snapshot. Les mises à jour fonctionnelles reçoivent la valeur la plus récente de la file de mises à jour et évitent de réutiliser trois fois le même snapshot.

## Moyen à difficile — Quelles pratiques sont adaptées à un formulaire contrôlé React ? (plusieurs réponses possibles)

-[x] Stocker la valeur de l'input dans un state.
-[x] Relier `value` à la valeur du state.
-[x] Mettre à jour le state dans `onChange`.
-[ ] Lire systématiquement la valeur avec `document.querySelector()` après chaque frappe.

### Commentaire de correction

Un input contrôlé a une source de vérité dans le state React : `value={email}` et `onChange={(event) => setEmail(event.target.value)}`. La lecture directe du DOM contourne ce modèle.

## Moyen à difficile — Lesquels sont des usages corrects de `useEffect` et de son cleanup ? (plusieurs réponses possibles)

```tsx
useEffect(() => {
  const connection = connect(roomId)
  return () => connection.disconnect()
}, [roomId])
```

-[x] L'effet est relancé lorsque `roomId` change.
-[x] La fonction retournée sert à nettoyer la connexion précédente.
-[x] Le cleanup est exécuté lors du démontage du composant.
-[ ] Le tableau de dépendances signifie que l'effet ne s'exécute jamais.

### Commentaire de correction

React exécute le cleanup avant de rejouer l'effet pour de nouvelles dépendances et lors du démontage. Un tableau `[roomId]` décrit la valeur dont l'effet dépend.

## Moyen à difficile — Quelles affirmations sont exactes à propos de `fetch` dans un composant React ? (plusieurs réponses possibles)

```tsx
useEffect(() => {
  fetch('/api/books')
    .then((response) => {
      if (!response.ok) throw new Error('HTTP error')
      return response.json() as Promise<Book[]>
    })
    .then(setBooks)
    .catch(() => setError(true))
}, [])
```

-[x] `response.json()` doit être attendu ou retourné dans la chaîne de promesses.
-[x] Un statut HTTP en erreur ne rejette pas automatiquement la promesse de `fetch`.
-[x] Le type `Book[]` décrit la forme attendue, mais ne valide pas les données à l'exécution.
-[ ] Le tableau vide garantit que la requête sera exécutée côté serveur avant le premier rendu.

### Commentaire de correction

`fetch` rejette surtout en cas d'erreur réseau ; il faut donc tester `response.ok`. TypeScript aide au développement, mais ne remplace pas une validation runtime des données reçues.

## Moyen à difficile — Quelles associations React Router sont correctes pour une route dynamique ? (plusieurs réponses possibles)

```tsx
<Routes>
  <Route path="/books/:bookId" element={<BookDetail />} />
</Routes>
```

-[x] `useParams()` permet de lire `bookId` dans `BookDetail`.
-[x] `/books/42` correspond à cette route et fournit `"42"` comme paramètre.
-[x] `Link` ou `NavLink` permet de naviguer sans rechargement complet de la SPA.
-[ ] `bookId` est automatiquement un nombre TypeScript.

### Commentaire de correction

Les paramètres d'URL sont des chaînes et peuvent être indéfinis selon le typage utilisé. Il faut convertir explicitement la valeur si le domaine attend un nombre.

## Moyen à difficile — Quelles affirmations décrivent correctement un hook personnalisé ? (plusieurs réponses possibles)

```tsx
function useToggle(initial = false) {
  const [enabled, setEnabled] = useState(initial)
  const toggle = () => setEnabled((value) => !value)
  return { enabled, toggle }
}
```

-[x] Son nom commence par `use`.
-[x] Chaque composant qui appelle `useToggle()` possède son propre state.
-[x] Il peut composer plusieurs hooks React.
-[ ] Deux appels dans deux composants partagent automatiquement la même valeur `enabled`.

### Commentaire de correction

Un hook personnalisé réutilise de la logique, mais ne partage pas automatiquement l'état. Le partage d'une valeur nécessite par exemple Context ou une solution de state management.

## Difficile à très difficile — Quelles clés sont valides pour une liste dont l'ordre peut changer ? (plusieurs réponses possibles)

```tsx
type Ticket = { id: string; title: string }
const tickets: Ticket[] = getTickets()

return tickets.map((ticket) => (
  <TicketRow key={/* choix */} ticket={ticket} />
))
```

-[x] `key={ticket.id}` si `id` est stable et unique.
-[x] Une clé stable dérivée d'un identifiant métier unique.
-[ ] `key={tickets.indexOf(ticket)}` si des tickets peuvent être insérés ou supprimés.
-[ ] `key={Math.random()}` pour éviter les collisions.

### Commentaire de correction

La clé représente l'identité logique de l'élément, pas sa position actuelle. L'index devient fragile lorsque l'ordre ou le contenu de la liste change, et une valeur aléatoire force des remplacements inutiles.

## Difficile à très difficile — Quelles transformations respectent l'immutabilité du state React ? (plusieurs réponses possibles)

```tsx
type Task = { id: number; done: boolean }
const [tasks, setTasks] = useState<Task[]>(initialTasks)
```

-[x] `setTasks((current) => current.map((task) => task.id === 2 ? { ...task, done: true } : task))`
-[x] `setTasks((current) => [...current, { id: 3, done: false }])`
-[ ] `tasks[0].done = true; setTasks(tasks)`
-[ ] `tasks.push({ id: 3, done: false }); setTasks(tasks)`

### Commentaire de correction

Les nouvelles références de tableau et d'objet rendent les changements explicites et prévisibles. Modifier directement le tableau ou un objet existant peut empêcher React de détecter correctement la mise à jour.

## Difficile à très difficile — Quelles affirmations sont correctes pour éviter une boucle d'effets lors d'un chargement dépendant d'un identifiant ? (plusieurs réponses possibles)

```tsx
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let ignore = false
    fetch(`/api/users/${userId}`)
      .then((response) => response.json() as Promise<User>)
      .then((nextUser) => {
        if (!ignore) setUser(nextUser)
      })
    return () => { ignore = true }
  }, [userId])

  return user ? <p>{user.name}</p> : <p>Chargement…</p>
}
```

-[x] `userId` doit figurer dans les dépendances car l'effet l'utilise.
-[x] Le cleanup empêche une ancienne réponse de remplacer une réponse plus récente.
-[x] Mettre `user` dans les dépendances pourrait relancer l'effet après chaque `setUser`.
-[ ] Le tableau vide `[]` serait toujours équivalent à `[userId]`.

### Commentaire de correction

Les dépendances doivent refléter les valeurs réactives utilisées par l'effet. Le garde `ignore` traite le cas où une requête précédente termine après le changement d'identifiant.

## Difficile à très difficile — Dans cet arbre de routes, quelles affirmations sont exactes ? (plusieurs réponses possibles)

```tsx
function Layout() {
  return (
    <>
      <nav>Menu</nav>
      <Outlet />
    </>
  )
}

<Routes>
  <Route path="/admin" element={<Layout />}>
    <Route path="reports" element={<Reports />} />
  </Route>
</Routes>
```

-[x] La route complète de `Reports` est `/admin/reports`.
-[x] `Outlet` rend le composant de la route enfant correspondante.
-[x] Le menu de `Layout` reste partagé entre les routes enfants rendues dans cet `Outlet`.
-[ ] La route enfant doit obligatoirement commencer par `/admin/reports`.

### Commentaire de correction

Une route enfant relative s'ajoute au chemin parent. `Outlet` est l'emplacement de rendu des enfants imbriqués ; le layout peut donc conserver une structure commune.

## Difficile à très difficile — Quelles affirmations sont exactes à propos de Context dans cet exemple ? (plusieurs réponses possibles)

```tsx
const ThemeContext = createContext<Theme | null>(null)

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('Provider manquant')
  return context
}
```

-[x] Un composant descendant doit être placé sous le Provider correspondant pour obtenir la valeur fournie.
-[x] Le hook personnalisé peut produire une erreur explicite lorsqu'il est utilisé hors Provider.
-[x] Un changement de valeur du Context peut re-rendre ses consommateurs.
-[ ] Context rend inutile toute utilisation des props et du state local.

### Commentaire de correction

Context évite un prop drilling pour des données partagées, mais ne remplace pas systématiquement les props ou le state local. Il faut aussi limiter les Context trop larges et fréquemment mis à jour.

## Difficile à très difficile — Quelle stratégie produit une navigation programmée après validation d'un formulaire ? (plusieurs réponses possibles)

```tsx
function Checkout() {
  // ...
}
```

-[x] Utiliser `useNavigate()` puis appeler la fonction retournée après le succès de la validation.
-[x] Utiliser une route cible cohérente, par exemple `navigate('/confirmation')`.
-[ ] Modifier directement `window.location.href` pour toute navigation interne afin de conserver l'état SPA.
-[ ] Appeler `useNavigate()` à l'intérieur du gestionnaire `onSubmit`.

### Commentaire de correction

Les hooks se déclarent au niveau supérieur du composant. `useNavigate` fournit ensuite une fonction de navigation programmatique, généralement sans rechargement complet pour une route interne.

## Facile à moyen — Quelle déclaration TypeScript décrit correctement les props d'un composant ?

```tsx
type AvatarProps = {
  name: string
  size?: number
}
```

-[ ] `name` peut recevoir n'importe quelle valeur et `size` est obligatoire.
-[x] `name` est obligatoire et doit être une chaîne ; `size` est optionnelle et numérique.
-[ ] Les props doivent toujours être déclarées avec une classe TypeScript.
-[ ] Une interface ou un type ne peut pas décrire des props React.

### Commentaire de correction

Un `type` ou une `interface` TypeScript peut décrire la forme des props. Le `?` rend `size` optionnelle, tandis que `name: string` impose une chaîne.

## Facile à moyen — Quel fragment JSX est valide pour retourner plusieurs éléments sans ajouter de nœud DOM ?

-[ ] `<fragment><h1>Titre</h1><p>Texte</p></fragment>`
-[x] `<> <h1>Titre</h1><p>Texte</p> </>`
-[ ] `[] <h1>Titre</h1> <p>Texte</p> []`
-[ ] `<React.Children><h1>Titre</h1><p>Texte</p></React.Children>`

### Commentaire de correction

Le fragment court `<>...</>` regroupe plusieurs éléments JSX sans ajouter de balise correspondante dans le DOM.

## Facile à moyen — Quelle syntaxe importe correctement un composant exporté par défaut ?

```tsx
// Button.tsx
export default function Button() {
  return <button>Valider</button>
}
```

-[x] `import Button from './Button'`
-[ ] `import { Button } from './Button'`
-[ ] `import default as Button from './Button'`
-[ ] `require default Button from './Button'`

### Commentaire de correction

Un export par défaut s'importe sans accolades et peut recevoir le nom local choisi par le fichier importeur.

## Facile à moyen — Quel gestionnaire est adapté à un clic sur un bouton React ?

-[ ] `<button click={handleClick}>Ajouter</button>`
-[x] `<button onClick={handleClick}>Ajouter</button>`
-[ ] `<button on-click={handleClick}>Ajouter</button>`
-[ ] `<button onclick="handleClick">Ajouter</button>`

### Commentaire de correction

Les événements JSX utilisent la convention camelCase, notamment `onClick`, et reçoivent une fonction plutôt qu'une chaîne de caractères.

## Facile à moyen — Quelle expression affiche `Bienvenue` uniquement lorsque `isConnected` vaut `true` ?

-[ ] `{if (isConnected) <p>Bienvenue</p>}`
-[x] `{isConnected && <p>Bienvenue</p>}`
-[ ] `{isConnected ? return <p>Bienvenue</p> : return null}`
-[ ] `{isConnected.show(<p>Bienvenue</p>)}`

### Commentaire de correction

L'opérateur `&&` permet un rendu conditionnel simple dans une expression JSX. Un `if` est une instruction et ne peut pas être placé directement entre accolades de cette manière.

## Facile à moyen — Quel composant permet de donner un style différent au lien correspondant à la route active ?

-[ ] `ActiveLink`
-[x] `NavLink`
-[ ] `RouteLink`
-[ ] `BrowserLink`

### Commentaire de correction

`NavLink` fournit les informations nécessaires pour appliquer un style ou une classe au lien actif, contrairement à un lien générique.

## Moyen à difficile — Quelles affirmations sont correctes à propos du rendu conditionnel avec un ternaire ? (plusieurs réponses possibles)

```tsx
return isLoading
  ? <p>Chargement…</p>
  : <ProductGrid products={products} />
```

-[x] La branche de gauche est rendue lorsque `isLoading` est vraie.
-[x] La branche de droite est rendue lorsque `isLoading` est fausse.
-[x] Le ternaire est une expression utilisable directement dans le JSX.
-[ ] Les deux branches sont toujours affichées puis masquées par React.

### Commentaire de correction

Le ternaire choisit une seule des deux expressions selon la condition. C'est un pattern adapté lorsque deux états d'affichage sont clairement identifiés.

## Moyen à difficile — Quelles opérations produisent une nouvelle liste filtrée sans modifier le state original ? (plusieurs réponses possibles)

```tsx
const [members, setMembers] = useState<Member[]>(initialMembers)
const activeMembers = members.filter((member) => member.active)
```

-[x] Utiliser `filter()` pour calculer `activeMembers`.
-[x] Conserver `members` inchangé et afficher `activeMembers`.
-[x] Appeler `setMembers()` uniquement si le state lui-même doit être modifié.
-[ ] Supprimer les membres inactifs avec `members.splice()` pendant le rendu.

### Commentaire de correction

`filter()` retourne un nouveau tableau et convient au calcul d'une vue dérivée. Modifier le state pendant le rendu ou avec `splice()` détruit l'immutabilité attendue.

## Moyen à difficile — Quelles associations de types d'événements sont correctes en React + TypeScript ? (plusieurs réponses possibles)

```tsx
function Form() {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {}
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {}
  return <form onSubmit={handleSubmit}><input onChange={handleChange} /></form>
}
```

-[x] `React.ChangeEvent<HTMLInputElement>` convient à `onChange` de cet input.
-[x] `React.FormEvent<HTMLFormElement>` convient à `onSubmit` de ce formulaire.
-[x] `event.preventDefault()` peut empêcher le rechargement natif du formulaire.
-[ ] `React.MouseEvent` est le type obligatoire pour tous les événements React.

### Commentaire de correction

Le type dépend de l'élément et de l'événement. `ChangeEvent` décrit ici la saisie, `FormEvent` la soumission, tandis que `MouseEvent` concerne les interactions de souris.

## Moyen à difficile — Quelles affirmations sont exactes pour cet effet ? (plusieurs réponses possibles)

```tsx
useEffect(() => {
  document.title = `Panier (${itemCount})`
}, [itemCount])
```

-[x] Le titre est synchronisé après le rendu lorsque `itemCount` change.
-[x] L'effet est rejoué si `itemCount` reçoit une nouvelle valeur.
-[x] Le code ne devrait pas appeler `setItemCount` dans cet effet pour éviter une boucle inutile.
-[ ] L'effet s'exécute avant que React ne rende le composant.

### Commentaire de correction

`useEffect` synchronise le composant avec un système externe après le rendu. La dépendance décrit la donnée qui déclenche une nouvelle synchronisation.

## Moyen à difficile — Quels états sont utiles pour représenter un chargement d'API typé ? (plusieurs réponses possibles)

```tsx
type ViewState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}
```

-[x] `loading` permet d'afficher un indicateur pendant la requête.
-[x] `error` permet d'afficher un message lorsque la requête échoue.
-[x] `data: T | null` représente l'absence initiale de données puis la réponse.
-[ ] Le type de la réponse peut toujours être `any` sans réduire la sécurité TypeScript.

### Commentaire de correction

Séparer loading, error et data rend les états de l'interface explicites. Le generic `T` conserve le type attendu de la réponse sans abandonner le typage.

## Moyen à difficile — Quelles affirmations sont exactes à propos d'une route déclarée avec `Link` ? (plusieurs réponses possibles)

```tsx
<Routes>
  <Route path="/about" element={<About />} />
</Routes>

<Link to="/about">À propos</Link>
```

-[x] Le clic sur `Link` demande l'affichage de la route `/about`.
-[x] `Link` est destiné à la navigation interne gérée par React Router.
-[x] Une route non déclarée ne rend pas automatiquement le composant `About`.
-[ ] `Link` exige que `About` soit importé depuis React Router.

### Commentaire de correction

La route associe un chemin à un élément, tandis que `Link` déclenche la navigation vers ce chemin. Le composant `About` reste un composant de l'application.

## Moyen à difficile — Quelles affirmations sont exactes concernant `useSearchParams` ? (plusieurs réponses possibles)

```tsx
const [searchParams, setSearchParams] = useSearchParams()
const category = searchParams.get('category')
```

-[x] `category` est lu dans la query string de l'URL.
-[x] `searchParams.get('category')` peut retourner `null`.
-[x] `setSearchParams({ category: 'books' })` peut mettre à jour la query string.
-[ ] `category` est toujours un nombre parce qu'il provient d'une URL.

### Commentaire de correction

Les query params sont des chaînes ou `null` lorsqu'elles sont absentes. Une conversion explicite est nécessaire pour obtenir un nombre ou un autre type métier.

## Difficile à très difficile — Pourquoi ce composant ne doit-il pas calculer `fullName` avec un `useEffect` ? (plusieurs réponses possibles)

```tsx
function Profile({ firstName, lastName }: Props) {
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`)
  }, [firstName, lastName])

  return <h1>{fullName}</h1>
}
```

-[x] `fullName` est une valeur dérivée calculable directement pendant le rendu.
-[x] Le state et l'effet ajoutent un rendu intermédiaire inutile.
-[x] `const fullName = \`${firstName} ${lastName}\`` est une alternative plus simple.
-[ ] Tout calcul basé sur des props doit obligatoirement passer par `useEffect`.

### Commentaire de correction

La documentation React recommande de ne pas utiliser un effet pour transformer des données destinées au rendu. Un effet sert à synchroniser avec un système externe, pas à fabriquer une valeur dérivée locale.

## Difficile à très difficile — Quelles pratiques évitent une fuite liée à un écouteur d'événement dans un effet ? (plusieurs réponses possibles)

```tsx
useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

-[x] Enregistrer l'écouteur dans l'effet.
-[x] Retirer le même gestionnaire dans le cleanup.
-[x] Utiliser le cleanup lors du démontage du composant.
-[ ] Créer un nouveau callback anonyme différent dans `removeEventListener`.

### Commentaire de correction

Le navigateur retire un écouteur lorsqu'il reçoit la même référence de fonction et le même type d'événement. Le cleanup évite l'accumulation d'écouteurs après des montages et démontages.

## Difficile à très difficile — Quelles affirmations sont correctes pour protéger un composant contre une réponse API obsolète ? (plusieurs réponses possibles)

```tsx
useEffect(() => {
  let ignore = false
  fetch(`/api/items/${itemId}`)
    .then((response) => response.json() as Promise<Item>)
    .then((item) => { if (!ignore) setItem(item) })
  return () => { ignore = true }
}, [itemId])
```

-[x] Le cleanup marque la requête précédente comme obsolète.
-[x] La réponse précédente ne met pas à jour le state si `itemId` a changé.
-[x] `itemId` doit rester dans les dépendances de l'effet.
-[ ] Le flag `ignore` annule nécessairement la requête réseau côté serveur.

### Commentaire de correction

Le flag empêche l'application de consommer une réponse devenue obsolète ; il ne garantit pas l'annulation physique de la requête. Pour cela, un `AbortController` peut être utilisé.

## Difficile à très difficile — Quelles affirmations sont exactes pour ce hook générique ? (plusieurs réponses possibles)

```tsx
function useToggle<T extends string>(initial: T) {
  const [value, setValue] = useState<T>(initial)
  const toggle = (next: T) => setValue(next)
  return { value, toggle }
}
```

-[x] Le generic contraint `T` aux chaînes.
-[x] La valeur de retour expose un état et une fonction nommée.
-[x] Le hook conserve un state indépendant pour chaque appel.
-[ ] `T` est une validation des valeurs reçues au runtime dans le navigateur.

### Commentaire de correction

Le generic aide TypeScript à vérifier les usages lors de la compilation. Il ne valide pas les données JavaScript au runtime, et chaque appel du hook possède sa propre instance de state.

## Difficile à très difficile — Quelles affirmations sont exactes au sujet de `key` et du state d'un composant de liste ? (plusieurs réponses possibles)

-[x] Une clé stable aide React à préserver l'identité et le state d'un élément entre les rendus.
-[x] Changer la clé peut provoquer le remontage du composant concerné.
-[x] Une clé doit être placée sur l'élément produit directement par `map()`.
-[ ] La clé est automatiquement disponible dans le composant enfant via une prop `key`.

### Commentaire de correction

`key` est un indice réservé à React, pas une prop transmise automatiquement. Une clé stable permet de faire correspondre les éléments d'une liste entre deux rendus.

## Difficile à très difficile — Quelles affirmations sont exactes pour lire un paramètre de route et gérer son absence ? (plusieurs réponses possibles)

```tsx
function InvoiceDetail() {
  const { invoiceId } = useParams<{ invoiceId: string }>()
  if (!invoiceId) return <p>Facture introuvable</p>
  return <Invoice id={invoiceId} />
}
```

-[x] Le paramètre est lu depuis le segment dynamique de l'URL.
-[x] Le guard évite d'utiliser une valeur potentiellement absente.
-[x] `invoiceId` reste une chaîne tant qu'il n'est pas converti.
-[ ] Le generic transforme automatiquement `invoiceId` en nombre.

### Commentaire de correction

`useParams` lit les paramètres nommés de la route et leur typage doit refléter leur disponibilité possible. Les valeurs d'URL sont des chaînes.

## Difficile à très difficile — Quelles affirmations sont correctes pour utiliser une ref DOM avec TypeScript ? (plusieurs réponses possibles)

```tsx
function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null)

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Rechercher</button>
    </>
  )
}
```

-[x] `HTMLInputElement` documente le type de l'élément ciblé.
-[x] L'opérateur `?.` évite une erreur si `current` vaut `null`.
-[x] Modifier la ref ne déclenche pas un rendu comme `setState`.
-[ ] La ref doit être créée dans `focusInput` pour rester accessible au bouton.

### Commentaire de correction

Une ref se déclare au niveau supérieur du composant et est attachée avec `ref={inputRef}`. `current` peut être nul avant le montage ; la ref sert à conserver une valeur mutable sans déclencher de rendu.

## Références officielles

- [React — Quick Start](https://react.dev/learn)
- [React — State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [React — Rendering Lists](https://react.dev/learn/rendering-lists)
- [React — Responding to Events](https://react.dev/learn/responding-to-events)
- [React — Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React — Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React — Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React — `useState`](https://react.dev/reference/react/useState)
- [React — `useEffect`](https://react.dev/reference/react/useEffect)
- [React — `useRef`](https://react.dev/reference/react/useRef)
