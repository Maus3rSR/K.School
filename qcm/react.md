# QCM — React · TypeScript · Hooks · API · React Router

## Dans quel fichier JSX une expression JavaScript peut-elle être insérée dans le markup ?

-[ ] Entre des balises HTML classiques, sans syntaxe particulière
-[x] Entre accolades, par exemple `{user.name}`
-[ ] Entre crochets, par exemple `[user.name]`
-[ ] Dans un attribut `javascript`, par exemple `javascript={user.name}`

### Commentaire de correction

Les accolades permettent de repasser du JSX vers JavaScript. Elles servent aussi dans les attributs JSX, par exemple `src={user.imageUrl}`.

## Que se passe-t-il si on écrit `<userCard />` au lieu de `<UserCard />` dans le JSX ?

-[x] React traite `userCard` comme une balise HTML native inconnue, pas comme le composant.
-[ ] React affiche quand même le composant `UserCard`, la casse n'a pas d'importance.
-[ ] Une erreur de compilation TypeScript bloque systématiquement le build.
-[ ] `userCard` devient automatiquement un alias de `UserCard`.

### Commentaire de correction

JSX utilise la casse pour distinguer les composants (majuscule) des balises HTML natives (minuscule). Écrire `<userCard />` fait chercher à React une balise HTML `usercard`, pas votre composant.

## Quel attribut permet d'appliquer une classe CSS à un élément JSX ?

-[ ] `class`
-[x] `className`
-[ ] `cssClass`
-[ ] `styleClass`

### Commentaire de correction

En JSX, l'attribut `class` du HTML s'écrit `className`, par exemple `<button className="primary">`.

## Quel code déclare un state numérique initialisé à zéro ?

```tsx
import { useState } from 'react'
```

-[ ] `const count = useState<number>(0)`
-[x] `const [count, setCount] = useState<number>(0)`
-[ ] `const { count, setCount } = useState<number>(0)`
-[ ] `const [count] = setState<number>(0)`

### Commentaire de correction

`useState` retourne un tableau contenant la valeur actuelle et sa fonction de mise à jour. La déstructuration `[count, setCount]` est la convention attendue.

## Quelle propriété est indispensable pour rendre une liste de composants avec `map()` ?

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

## Que se passe-t-il si `<Routes>` est utilisé sans être enveloppé par `<BrowserRouter>` ?

```tsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
```

-[x] React Router lève une erreur, car `Routes` a besoin du contexte de navigation fourni par `BrowserRouter`.
-[ ] Rien ne change : `BrowserRouter` ne sert qu'à styliser les liens actifs.
-[ ] L'application affiche une page blanche, sans aucun message d'erreur.
-[ ] `Route` fonctionne seul, mais uniquement pour la route `/`.

### Commentaire de correction

`BrowserRouter` doit envelopper toute l'application, une seule fois, pour fournir le contexte de navigation dont `Routes` et `Route` ont besoin. Sans lui, React Router lève une erreur explicite plutôt que d'échouer silencieusement.

## Quelles affirmations décrivent correctement le passage de données entre composants ? (plusieurs réponses possibles)

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

-[x] Les props descendent du composant parent vers le composant enfant.
-[x] `price` est optionnelle et prend `0` par défaut dans ce composant.
-[ ] `children` est toujours obligatoire dans un composant qui accepte des props.
-[ ] L'enfant peut modifier directement l'objet `props` reçu.

### Commentaire de correction

Les props sont en lecture seule et suivent un flux unidirectionnel parent → enfant. Le destructuring permet ici de définir une valeur par défaut, tandis que `children` reçoit le contenu imbriqué.

## Ce compteur ne fonctionne pas comme prévu : un seul clic ne donne que `+1` au lieu de `+3`. Quelle correction règle le problème ?

```tsx
const [score, setScore] = useState(0)

function handleTripleClick() {
  setScore(score + 1) // score vaut 0 → devient 1
  setScore(score + 1) // score vaut encore 0 ici → redevient 1
  setScore(score + 1) // score vaut encore 0 ici → redevient 1
  // résultat obtenu : 1 (au lieu de 3 attendu)
}
```

-[ ] Remplacer `useState(0)` par `useState(3)`.
-[x] Remplacer chaque appel par `setScore((current) => current + 1)`.
-[ ] Ajouter `score += 1` avant chaque `setScore(score + 1)`.
-[ ] Appeler `setScore(score + 3)`.

### Commentaire de correction

`score` reste figé à sa valeur du dernier rendu pendant toute l'exécution de `handleTripleClick` : les trois appels utilisent la même valeur `0`. La forme fonctionnelle `(current) => current + 1` reçoit à chaque fois la valeur la plus récente, même au sein du même clic, ce qui permet de cumuler correctement les trois incréments.

## Quelles pratiques sont adaptées à un formulaire contrôlé React ? (plusieurs réponses possibles)

-[ ] Mettre à jour le state uniquement dans `onBlur`.
-[ ] Lire systématiquement la valeur avec `document.querySelector()` après chaque frappe.
-[x] Stocker la valeur de l'input dans un state.
-[x] Relier `value` à la valeur du state.

### Commentaire de correction

Un input contrôlé a une source de vérité dans le state React : `value={email}` et `onChange={(event) => setEmail(event.target.value)}`. La lecture directe du DOM contourne ce modèle.

## Lesquels sont des usages corrects de `useEffect` et de son cleanup ? (plusieurs réponses possibles)

```tsx
function CountdownTimer({ duration }: { duration: number }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('tic')
    }, 1000)
    return () => clearInterval(intervalId)
  }, [duration])

  return <p>Compte à rebours : {duration}s</p>
}
```

-[ ] Le cleanup est exécuté uniquement lorsque le composant est démonté.
-[x] La fonction retournée sert à nettoyer l'intervalle précédent.
-[x] L'effet est relancé lorsque `duration` change.
-[ ] Le tableau de dépendances signifie que l'effet ne s'exécute jamais.

### Commentaire de correction

React exécute le cleanup avant de rejouer l'effet pour de nouvelles dépendances, et aussi lors du démontage. Un tableau `[duration]` décrit la valeur dont l'effet dépend — ici, il faut relancer le minuteur si la durée change.

## Quelles affirmations sont exactes à propos de `fetch` dans un composant React ? (plusieurs réponses possibles)

```tsx
useEffect(() => {
  fetch('/api/reviews')
    .then((response) => {
      if (!response.ok) throw new Error('HTTP error')
      return response.json() as Promise<Review[]>
    })
    .then(setReviews)
    .catch(() => setError(true))
}, [])
```

-[x] `response.json()` doit être attendu ou retourné dans la chaîne de promesses.
-[ ] Le type `Review[]` valide automatiquement les données reçues à l'exécution.
-[ ] Le tableau vide des dépendances de `useEffect` garantit que la requête sera exécutée côté serveur avant le premier rendu.
-[x] Un statut HTTP en erreur ne rejette pas automatiquement la promesse de `fetch`.

### Commentaire de correction

`fetch` rejette surtout en cas d'erreur réseau ; il faut donc tester `response.ok`. TypeScript aide au développement, mais ne remplace pas une validation runtime des données reçues.

## Quelles associations React Router sont correctes pour une route dynamique ? (plusieurs réponses possibles)

```tsx
<Routes>
  <Route path="/books/:bookId" element={<BookDetail />} />
</Routes>
```

-[x] `useParams()` permet de lire `bookId` dans `BookDetail`.
-[ ] `useSearchParams()` permet de lire `bookId` dans `BookDetail`.
-[x] `/books/42` correspond à cette route et fournit `"42"` comme paramètre.
-[ ] La route `/books/:bookId` correspond aussi à `/books`, sans paramètre.

### Commentaire de correction

Les paramètres d'URL sont des chaînes et peuvent être indéfinis selon le typage utilisé. Il faut convertir explicitement la valeur si le domaine attend un nombre. Un segment dynamique comme `:bookId` est obligatoire par défaut : `/books` seul ne correspond pas à cette route.

## Quelles affirmations décrivent correctement un hook personnalisé ? (plusieurs réponses possibles)

```tsx
function useToggle(initial = false) {
  const [enabled, setEnabled] = useState(initial)
  const toggle = () => setEnabled((value) => !value)
  return { enabled, toggle }
}
```

-[x] Son nom commence par `use`.
-[x] Chaque composant qui appelle `useToggle()` possède son propre state.
-[ ] Il ne peut jamais composer d'autres hooks React.
-[ ] Deux appels dans deux composants partagent automatiquement la même valeur `enabled`.

### Commentaire de correction

Un hook personnalisé réutilise de la logique, mais ne partage pas automatiquement l'état. Chaque appel du hook crée sa propre instance de state, indépendante des autres composants qui l'utilisent.

## Quel appel de Hook respecte les règles à suivre dans un composant ou un hook personnalisé ?

```tsx
function ProductPanel({ isOpen }: { isOpen: boolean }) {
  if (isOpen) {
    const [count, setCount] = useState(0)
  }
  return <p>Panneau</p>
}
```

-[ ] Le code ci-dessus est valide car `useState` peut s'appeler n'importe où.
-[x] `useState` doit être appelé au niveau racine du composant, jamais dans une condition.
-[ ] Cette règle ne s'applique qu'aux hooks personnalisés, pas aux hooks natifs comme `useState`.
-[ ] Il suffit de renommer `count` pour rendre cet appel valide.

### Commentaire de correction

Les Hooks doivent toujours être appelés au niveau racine, dans le même ordre à chaque rendu — jamais dans une condition, une boucle ou après un retour anticipé. Cette règle s'applique aussi bien aux hooks natifs (`useState`, `useEffect`) qu'aux hooks personnalisés.

## Quelle clé est la plus adaptée à une liste dont l'ordre peut changer ?

```tsx
type Ticket = { id: string; title: string }
const tickets: Ticket[] = getTickets()

return tickets.map((ticket) => (
  <TicketRow key={/* choix */} ticket={ticket} />
))
```

-[x] `key={ticket.id}` si `id` est stable et unique.
-[ ] `key={ticket.title}`, même si deux tickets peuvent partager le même titre.
-[ ] `key={tickets.indexOf(ticket)}` si des tickets peuvent être insérés ou supprimés.
-[ ] `key={Math.random()}` pour éviter les collisions.

### Commentaire de correction

La clé représente l'identité logique de l'élément, pas sa position actuelle. Un titre non garanti unique, un index qui bouge à chaque insertion/suppression, ou une valeur aléatoire régénérée à chaque rendu sont tous instables — seul un identifiant stable et unique comme `id` convient.

## Quelle transformation marque la tâche d'id `2` comme terminée sans muter le state existant ?

```tsx
type Task = { id: number; done: boolean }
const [tasks, setTasks] = useState<Task[]>(initialTasks)
```

-[x] `setTasks((current) => current.map((task) => task.id === 2 ? { ...task, done: true } : task))`
-[ ] `setTasks((current) => [...current, { id: 3, done: false }])`
-[ ] `tasks[0].done = true; setTasks(tasks)`
-[ ] `tasks.push({ id: 3, done: false }); setTasks(tasks)`

### Commentaire de correction

Seule la première option cible la tâche 2 et produit un nouveau tableau sans muter l'existant. La deuxième option ajoute une tâche différente (elle ne répond pas à l'objectif), tandis que les deux dernières mutent directement `tasks`, ce que React ne détecte pas comme un changement d'état.

## Quelles affirmations sont exactes à propos du tableau de dépendances de cet effet ? (plusieurs réponses possibles)

```tsx
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function loadUser() {
      const res = await fetch(`/api/users/${userId}`)
      const data: User = await res.json()
      setUser(data)
    }
    loadUser()
  }, [userId])

  return user ? <p>{user.name}</p> : <p>Chargement…</p>
}
```

-[x] Sans tableau de dépendances du tout, l'effet s'exécuterait à chaque rendu et déclencherait un fetch en boucle.
-[x] Si le composant se re-rend pour une autre raison, sans que `userId` ne change, l'effet ne relance pas le fetch.
-[ ] Puisque `userId` est une prop et non un state, il n'a pas besoin de figurer dans les dépendances.
-[x] L'effet utilise `userId` : il doit être relancé si sa valeur change.

### Commentaire de correction

Toute valeur réactive utilisée dans un effet — y compris une prop comme `userId` — doit figurer dans son tableau de dépendances. Sans tableau du tout, l'effet tournerait à chaque rendu ; avec `[userId]`, il ne se relance que lorsque l'identifiant change réellement, pas à chaque re-rendu du composant.

## Dans cet arbre de routes, quelles affirmations sont exactes ? (plusieurs réponses possibles)

```tsx
function Layout() {
  return (
    <>
      <nav>Menu</nav>
      <Outlet />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Layout />}>
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  )
}
```

-[ ] Le menu de `Layout` est remplacé par chaque route enfant rendue dans cet `Outlet`.
-[x] La route complète de `Reports` est `/admin/reports`.
-[x] `Outlet` rend le composant de la route enfant correspondante.
-[ ] La route enfant doit obligatoirement commencer par `/admin/reports`.

### Commentaire de correction

Une route enfant relative s'ajoute au chemin parent. `Outlet` est l'emplacement de rendu des enfants imbriqués ; le layout peut donc conserver une structure commune.

## Quelle stratégie produit une navigation programmée après validation d'un formulaire ?

-[x] Utiliser `useNavigate()` puis appeler la fonction retournée après le succès de la validation.
-[ ] Rappeler `useNavigate()` juste avant chaque navigation, pour obtenir une fonction à jour.
-[ ] Modifier directement `window.location.href` pour toute navigation interne afin de conserver l'état SPA.
-[ ] Appeler `useNavigate()` à l'intérieur du gestionnaire `onSubmit`.

### Commentaire de correction

`useNavigate()` se déclare une seule fois, au niveau supérieur du composant ; la fonction qu'il retourne reste valable pour toute navigation ultérieure. Elle ne doit être ni rappelée à chaque navigation, ni invoquée depuis l'intérieur d'un gestionnaire d'événement.

## Quel style est appliqué par ce composant selon la prop `variant` ?

```tsx
type ButtonProps = {
  variant: 'primary' | 'danger'
}

function Button({ variant }: ButtonProps) {
  return (
    <button className={variant === 'danger' ? 'btn-danger' : 'btn-primary'}>
      Valider
    </button>
  )
}
```

-[x] La classe appliquée dépend directement de la valeur reçue dans le paramètre `variant`.
-[ ] `className` doit obligatoirement être calculé dans un `useEffect`.
-[ ] Deux valeurs de classe ne peuvent jamais être choisies dans un même composant.
-[ ] La prop `variant` doit être modifiée directement pour changer le style affiché.

### Commentaire de correction

La `className` peut être calculée directement pendant le rendu à partir des props, ici avec un ternaire. Les props sont en lecture seule : on ne les modifie jamais directement pour changer l'affichage.

## Pourquoi ce composant provoque-t-il une erreur de compilation ?

```tsx
function Header() {
  return (
    <h1>Titre</h1>
    <p>Sous-titre</p>
  )
}
```

-[x] Un composant ne peut retourner qu'un seul élément racine.
-[ ] `<h1>` et `<p>` ne peuvent jamais être utilisés dans le même composant.
-[ ] Il manque un point-virgule entre les deux balises.
-[ ] Ce code ne provoque pas d'erreur de compilation.

### Commentaire de correction

JSX exige un seul élément racine. Le fragment court `<>...</>` permet de regrouper plusieurs éléments sans ajouter de balise superflue au DOM.

## Quelle syntaxe importe correctement ce composant exporté nommément ?

```tsx
// Button.tsx
export function Button() {
  return <button>Valider</button>
}
```

-[x] `import { Button } from './Button'`
-[ ] `import Button from './Button'`
-[ ] `import * as Button from './Button'`
-[ ] `import './Button'` puis utiliser `<Button />` sans l'avoir importé.

### Commentaire de correction

Un export nommé (`export function Button`) s'importe avec des accolades reprenant exactement le nom exporté. `import Button from './Button'` chercherait un export par défaut, qui n'existe pas dans ce fichier.

## Quel gestionnaire est adapté à un clic sur un bouton React ?

-[ ] `<button click={handleClick}>Ajouter</button>`
-[x] `<button onClick={handleClick}>Ajouter</button>`
-[ ] `<button on-click={handleClick}>Ajouter</button>`
-[ ] `<button onclick="handleClick">Ajouter</button>`

### Commentaire de correction

Les événements JSX utilisent la convention camelCase, notamment `onClick`, et reçoivent une fonction plutôt qu'une chaîne de caractères.

## Quelle expression affiche `Bienvenue` uniquement lorsque `isConnected` vaut `true` dans un template JSX ?

-[ ] `{if (isConnected) <p>Bienvenue</p>}`
-[ ] `{isConnected ? return <p>Bienvenue</p> : return null}`
-[ ] `{isConnected.show(<p>Bienvenue</p>)}`
-[x] `{isConnected && <p>Bienvenue</p>}`

### Commentaire de correction

L'opérateur `&&` permet un rendu conditionnel simple dans une expression JSX. Un `if` est une instruction et ne peut pas être placé directement entre accolades de cette manière.

## Quelle est la différence de comportement entre `<Link>` et `<NavLink>` ?

-[ ] `<NavLink>` recharge la page à chaque clic, contrairement à `<Link>`.
-[x] `<NavLink>` permet d'appliquer un style particulier lorsque sa route correspond à l'URL actuelle.
-[ ] `<Link>` ne fonctionne qu'à l'intérieur d'un `<NavLink>`.
-[ ] Les deux composants sont strictement interchangeables, sans aucune différence.

### Commentaire de correction

`<NavLink>` étend `<Link>` en exposant l'état "actif" (via une classe ou une fonction de style), ce qui permet par exemple de mettre en évidence l'élément de menu correspondant à la page affichée.

## Quelles affirmations sont correctes à propos d'une ternaire ? (plusieurs réponses possibles)

```tsx
return isLoading
  ? <p>Chargement…</p>
  : <ProductGrid products={products} />
```

-[x] La branche de gauche est rendue lorsque `isLoading` est vraie.
-[ ] La branche de droite est rendue lorsque `isLoading` est vraie.
-[x] La branche de droite est rendue lorsque `isLoading` est fausse.
-[] La branche de gauche est rendue lorsque `isLoading` est fausse.

### Commentaire de correction

Le ternaire est une expression : expression ? code si vrai : code si faux

## Que se passe-t-il si `event.preventDefault()` n'est pas appelé dans ce gestionnaire ?

```tsx
function ContactForm() {
  function handleSubmit(event) {
    console.log('Envoi du formulaire')
  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Envoyer</button>
    </form>
  )
}
```

-[x] Le navigateur recharge la page, car le comportement natif du formulaire n'est pas empêché.
-[ ] React empêche automatiquement le rechargement de la page.
-[ ] `handleSubmit` ne peut jamais être appelé sans `event.preventDefault()`.
-[ ] Le formulaire disparaît définitivement après la soumission.

### Commentaire de correction

Sans `event.preventDefault()`, le comportement natif du navigateur reprend le dessus et recharge la page. C'est pourquoi cet appel est quasi systématique dans un gestionnaire `onSubmit` d'une SPA.

## Quelles affirmations sont exactes pour cet effet ? (plusieurs réponses possibles)

```tsx
useEffect(() => {
  document.title = `Panier (${itemCount})`
}, [itemCount])
```

-[x] Le titre est synchronisé après le rendu lorsque `itemCount` change.
-[x] L'effet est rejoué si `itemCount` reçoit une nouvelle valeur.
-[ ] Le code doit appeler `setItemCount` dans cet effet pour éviter une boucle inutile.
-[ ] L'effet s'exécute avant que React ne rende le composant.

### Commentaire de correction

`useEffect` synchronise le composant avec un système externe après le rendu. La dépendance décrit la donnée qui déclenche une nouvelle synchronisation.

## Quel est l'intérêt de séparer `isLoading`, `error` et `books` en trois states distincts ?

```tsx
function BookList() {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  if (isLoading) return <p>Chargement…</p>
  if (error) return <p>{error}</p>
  return <ul>{books.map((b) => <li key={b.id}>{b.title}</li>)}</ul>
}
```

-[x] Chaque état de l'interface (chargement, erreur, données) peut être affiché indépendamment.
-[ ] Un seul `useState` combinant les trois serait toujours plus simple à utiliser.
-[ ] `isLoading` doit obligatoirement rester à `true` après la réponse de l'API.
-[ ] `error` et `books` ne peuvent jamais être définis dans le même composant.

### Commentaire de correction

Séparer les états rend chaque cas d'affichage explicite (chargement, erreur, succès) et évite des combinaisons incohérentes. C'est le pattern recommandé pour tout appel d'API dans un composant React.

## Combien de fois ce composant se re-rend-il après un clic sur le bouton, et que va afficher `console.log(likes)` ?

```tsx
function LikeButton() {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  function handleClick() {
    setLikes(likes + 1)
    setIsLiked(!isLiked)
    console.log(likes)
  }

  return (
    <button onClick={handleClick}>
      {isLiked ? '❤️' : '🤍'} {likes}
    </button>
  )
}
```

-[ ] Deux re-rendus (un par appel de setState), et `console.log(likes)` affiche `1`.
-[x] Un seul re-rendu, et `console.log(likes)` affiche `0`.
-[ ] Un seul re-rendu, et `console.log(likes)` affiche `1`.
-[ ] Aucun re-rendu tant que le composant n'est pas remonté.

### Commentaire de correction

React regroupe (« batch ») les mises à jour de state déclenchées dans un même gestionnaire d'événement en un seul re-rendu, même si `setLikes` et `setIsLiked` concernent deux states différents. Comme pour le compteur vu en cours, `likes` reste figé à sa valeur du rendu en cours (`0`) pendant toute l'exécution de `handleClick` : `console.log(likes)` affiche donc `0`, pas la nouvelle valeur.

## Pourquoi ce composant ne doit-il pas calculer `fullName` avec un `useEffect` ? (plusieurs réponses possibles)

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
-[ ] `const fullName = \`${firstName} ${lastName}\`` est plus complexe qu'un effet.
-[ ] Tout calcul basé sur des props doit obligatoirement passer par `useEffect`.

### Commentaire de correction

La documentation React recommande de ne pas utiliser un effet pour transformer des données destinées au rendu. Un effet sert à synchroniser avec un système externe, pas à fabriquer une valeur dérivée locale.

## Quelle méthode de tableau permet de transformer une liste de données en liste d'éléments JSX ?

```tsx
const people = ['Alice', 'Bob', 'Chloé']
```

-[ ] people.forEach((name) => <li key={name}>{name}</li>)
-[ ] people.push((name) => <li key={name}>{name}</li>)
-[ ] people.transform((name) => <li key={name}>{name}</li>)
-[x] people.map((name) => <li key={name}>{name}</li>)

### Commentaire de correction

map() retourne un nouveau tableau à partir des données, ce qui convient pour produire un tableau d'éléments JSX. forEach() ne retourne rien (undefined) et ne peut donc pas être utilisé directement dans le JSX.

## Quelles affirmations sont exactes pour lire un paramètre de route et gérer son absence ? (plusieurs réponses possibles)

```tsx
function InvoiceDetail() {
  const { invoiceId } = useParams<{ invoiceId: string }>()
  if (!invoiceId) return <p>Facture introuvable</p>
  return <Invoice id={invoiceId} />
}
```

-[x] Le paramètre est lu depuis le segment dynamique de l'URL.
-[x] La condition évite de transmettre une valeur potentiellement absente à `<Invoice id={invoiceId} />`.
-[ ] La condition est inutile car `useParams` retourne toujours une chaîne non vide.
-[ ] Il faut utiliser `useSearchParams` pour lire `invoiceId` depuis l'URL.

### Commentaire de correction

`useParams` peut retourner `undefined` si le segment n'est pas présent dans l'URL actuelle. Sans guard, TypeScript signale que `invoiceId` pourrait être absent au moment de le transmettre à `Invoice` ; le retour anticipé lève cette ambiguïté avant le rendu.

## Quelles affirmations sont correctes à propos de cette ref ? (plusieurs réponses possibles)

```tsx
function SearchBox() {
  const inputRef = useRef(null)

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

-[x] `inputRef.current` peut valoir `null` avant que l'input soit monté.
-[x] Modifier `inputRef.current` ne déclenche pas de nouveau rendu, contrairement à un state.
-[ ] La ref doit être déclarée à l'intérieur de `focusInput` pour être utilisée par le bouton.
-[ ] `useRef` provoque un re-rendu à chaque frappe dans l'input.

### Commentaire de correction

Une ref se déclare au niveau supérieur du composant et conserve une valeur mutable entre les rendus sans provoquer de re-rendu. `current` peut être `null` tant que l'élément n'est pas monté, d'où l'utilité de l'opérateur `?.`.

## Quel hook permet de conserver l'identifiant d'un `setInterval` entre deux rendus sans provoquer de re-rendu inutile ?

```tsx
function Chrono() {
  // On veut démarrer/arrêter un minuteur avec deux boutons
  function start() {
    /* setInterval(...) — où stocker son id ? */
  }
  function stop() {
    /* clearInterval(...) — avec quel id ? */
  }
  return (
    <>
      <button onClick={start}>▶ Démarrer</button>
      <button onClick={stop}>⏹ Stopper</button>
    </>
  )
}
```

-[ ] Une variable locale `let timerId`, déclarée directement dans le composant.
-[x] `useRef<number | null>(null)`, pour garder la valeur sans redéclencher de rendu.
-[ ] `useState<number | null>(null)`, pour que l'identifiant soit toujours à jour à l'écran.
-[ ] Une variable globale déclarée en dehors du composant.

### Commentaire de correction

Une variable locale est réinitialisée à chaque rendu : l'id du timer serait perdu entre `start` et `stop`. `useState` fonctionnerait mais déclencherait un re-rendu à chaque écriture, inutile puisque l'id n'a pas besoin d'être affiché. `useRef` est fait pour ce cas précis : une valeur qui doit survivre aux rendus sans en provoquer de nouveaux.

## Quelles affirmations sont exactes à propos de cette fonction utilisant async/await ? (plusieurs réponses possibles)

```tsx
async function loadPosts() {
  try {
    const res = await fetch('/posts')
    const data = await res.json()
    setPosts(data)
  } catch (err) {
    setError('Erreur chargement')
  } finally {
    setIsLoading(false)
  }
}
```

-[x] `await` met en pause uniquement l'exécution de `loadPosts`, pas le reste de l'application.
-[x] Le bloc `catch` joue le même rôle que `.catch()` dans avec la syntaxe Promesse.
-[ ] `await` ne peut être utilisé qu'en dehors d'une fonction déclarée `async`.
-[ ] `finally` ne s'exécute que si une erreur survient dans le `try`.

### Commentaire de correction

`async/await` est une écriture différente des Promises, pas un concept séparé : `await` ne bloque que la fonction où il est écrit. `catch` et `finally` reprennent les rôles de `.catch()` et `.finally()` — `finally` s'exécute systématiquement, qu'il y ait eu une erreur ou non.

## Une interface de props définit `title: string` (sans `?`). Que se passe-t-il si le composant parent oublie de la fournir ?

```tsx
interface CardProps {
  title: string
  subtitle?: string
}

function Card({ title, subtitle }: CardProps) {
  return <h2>{title} — {subtitle}</h2>
}

// Utilisation
<Card />
```

-[ ] Rien : `title` vaudra `undefined` et l'application fonctionne normalement.
-[x] L'IDE signale une erreur de compilation : `title` est obligatoire et n'a pas de valeur par défaut.
-[ ] React affiche automatiquement une chaîne vide à la place de `title`.
-[ ] L'erreur n'apparaît qu'au moment de l'exécution dans le navigateur, jamais à la compilation.

### Commentaire de correction

Sans `?` dans l'interface, une prop est obligatoire : TypeScript détecte l'oubli dès la compilation (ou directement dans l'éditeur), avant même d'exécuter le code. C'est tout l'intérêt de typer les props — contrairement à `subtitle`, optionnelle grâce au `?`.

## Pourquoi préférer `<Link to="/about">` à `<a href="/about">` pour un lien interne dans une application React Router ?

```tsx
<a href="/about">À propos</a>
<Link to="/about">À propos</Link>
```

-[x] `<a href>` recharge toute l'application, alors que `<Link>` change l'URL sans recharger la page.
-[ ] `<a href>` ne fonctionne que sur les routes dynamiques (`:id`).
-[ ] `<Link>` désactive les boutons précédent/suivant du navigateur, contrairement à `<a href>`.
-[ ] Les deux ont un comportement strictement identique dans une SPA.

### Commentaire de correction

`<a href>` déclenche une navigation navigateur classique, avec rechargement complet de la page et perte du state React. `<Link>` intercepte le clic pour ne changer que l'URL et le contenu affiché, ce qui est tout l'intérêt d'une SPA.

## Sur l'URL `/products/42?source=newsletter`, quelle association est correcte ?

```tsx
<Route path="/products/:id" element={<ProductPage />} />
```

```tsx
function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const source = searchParams.get('source')
  // ...
}
```

-[x] `useParams` lit `42`, la ressource ciblée par l'URL.
-[x] `useSearchParams` lit `newsletter` via la clé `source`.
-[ ] `useParams` et `useSearchParams` lisent tous les deux la même valeur.
-[ ] Il faut choisir l'un ou l'autre : les deux ne peuvent pas être utilisés dans le même composant.

### Commentaire de correction

Un paramètre de route (`:id`) identifie une ressource précise et fait partie du chemin ; une query string (`?source=...`) précise ou filtre l'affichage sans changer de ressource. Les deux peuvent coexister sur la même URL et être lus dans le même composant.

## Quel est l'intérêt d'extraire la logique de `PostList` dans un hook personnalisé `useFetch` plutôt que de la dupliquer dans chaque composant qui appelle une API ? (plusieurs réponses possibles)

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(url)
        setData(await res.json())
      } catch {
        setError('Erreur chargement')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [url])

  return { data, isLoading, error }
}

function PostList() {
  const { data: posts, isLoading, error } = useFetch<Post[]>('/posts')
  // ...
}

function UserList() {
  const { data: users, isLoading, error } = useFetch<User[]>('/users')
  // ...
}
```

-[x] Corriger un bug dans la gestion loading/error/data ne demande qu'une seule modification, dans `useFetch`.
-[x] `PostList` et `UserList` restent courts et lisibles, sans répéter le pattern try/catch/finally.
-[ ] `PostList` et `UserList` partagent automatiquement les mêmes données, puisqu'ils utilisent le même hook.
-[ ] Sans ce hook, il serait impossible de typer les données reçues avec un générique comme `Post[]`.

### Commentaire de correction

Un hook personnalisé factorise une logique déjà écrite (ici le pattern loading/error/data vu avec `fetch`) pour éviter de la dupliquer dans chaque composant qui en a besoin : une seule source à corriger ou faire évoluer, et des composants plus lisibles. Chaque appel du hook reste néanmoins indépendant — `PostList` et `UserList` obtiennent chacun leur propre state, comme n'importe quel hook personnalisé.