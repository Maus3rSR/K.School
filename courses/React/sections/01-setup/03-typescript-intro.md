---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Introduction à TypeScript

---

# Introduction à TypeScript
Qu'est-ce que TypeScript ?

- **TypeScript = JavaScript + Types**
- Créé par **Microsoft** en 2012, open-source
- Votre code TS est **compilé** en JS standard → les navigateurs ne voient que du JS
- Il ne remplace pas JS, il l'**améliore**

<!--
Analogie : TypeScript c'est comme écrire avec un correcteur orthographique activé.
Il détecte les erreurs AVANT que le code s'exécute.
-->

---
layout: two-cols-header
---

# Introduction à TypeScript
Pourquoi TypeScript ?

::left::

## Sans TypeScript 😬
```js
function calculerAge(anneeNaissance) {
  return 2024 - anneeNaissance
}

calculerAge("Alice")
// Résultat : NaN ... mais pas d'erreur !
```

::right::

## Avec TypeScript ✅
```ts
function calculerAge(anneeNaissance: number): number {
  return 2024 - anneeNaissance
}

calculerAge("Alice")
// ❌ Erreur détectée AVANT l'exécution :
// Argument of type 'string' is not
// assignable to parameter of type 'number'
```

<!--
L'erreur est détectée dans l'éditeur, pas chez l'utilisateur final.
En entreprise, TS est quasi-systématique sur les projets React.
-->

---

# Introduction à TypeScript
Les types de base

```ts
// Types primitifs
let nom: string = "Alice"
let age: number = 30
let estConnecte: boolean = true

// Tableau
let fruits: string[] = ["pomme", "poire", "cerise"]
let notes: number[] = [18, 15, 12]

// Valeur absente ou nulle
let prenom: string | null = null
let description: string | undefined = undefined
```

<v-click>

> TypeScript infère souvent le type automatiquement — pas besoin de tout annoter !

</v-click>

<!--
L'inférence de type = TypeScript devine le type depuis la valeur initiale.
const age = 30 → TS sait que c'est un number sans qu'on l'écrive.
-->

---

# Introduction à TypeScript
Typer une fonction

```ts
// Paramètres typés + type de retour
function additionner(a: number, b: number): number {
  return a + b
}

// Arrow function typée
const saluer = (prenom: string): string => {
  return `Bonjour ${prenom} !`
}

// Fonction sans retour → void
const afficher = (message: string): void => {
  console.log(message)
}
```

<!--
void = la fonction ne retourne rien (undefined en pratique).
En React, les composants retournent du JSX — on verra le type ReactNode plus tard.
-->

---

# Introduction à TypeScript
Les objets typés — `interface`

```ts
// Décrire la forme d'un objet
interface Utilisateur {
  nom: string
  age: number
  email: string
}

// Utiliser l'interface
const alice: Utilisateur = {
  nom: "Alice",
  age: 30,
  email: "alice@example.com"
}

// ❌ Erreur si propriété manquante ou mauvais type
const bob: Utilisateur = {
  nom: "Bob",
  age: "trente",  // ❌ string ≠ number
}
```

<!--
Les interfaces sont LA base des composants React typés.
Dès la séance 3, on crée des interfaces pour les props.
Différence interface vs type : subtile, on verra en pratique. Pour l'instant, utiliser interface.
-->

---

# Introduction à TypeScript
Propriétés optionnelles

```ts
interface Profil {
  nom: string
  age: number
  bio?: string          // ← le ? rend la propriété optionnelle
  siteWeb?: string
}

// ✅ Les deux sont valides :
const profil1: Profil = { nom: "Alice", age: 30 }
const profil2: Profil = { nom: "Bob", age: 25, bio: "Développeur" }
```

<v-click>

> En React, les **props optionnelles** des composants utilisent exactement cette syntaxe.

</v-click>

<!--
On verra les props optionnelles en détail séance 3.
Bonne pratique : toujours définir une valeur par défaut pour les props optionnelles.
-->

---

# Introduction à TypeScript
TypeScript dans le projet React

```ts
// Un composant React typé — aperçu de ce qui arrive
interface BoutonProps {
  texte: string
  couleur?: string
}

function Bouton(props: BoutonProps) {
  return (
    <button style={{ color: props.couleur }}>
      {props.texte}
    </button>
  )
}

// ✅ Utilisation correcte
<Bouton texte="Cliquer" couleur="blue" />

// ❌ Erreur détectée à l'écriture
<Bouton />   // Propriété 'texte' manquante
```

<!--
Ne pas s'attarder sur la syntaxe JSX maintenant (séance 2).
Juste montrer que TS dans React = erreurs détectées tôt = moins de bugs.
-->

---
layout: center
class: text-center
---

# Introduction à TypeScript
&nbsp;

> 💬 TypeScript a signalé une erreur sans exécuter le code. Mais comment l'éditeur sait-il quels types attendre — et où sont-ils définis ?

<!--
Réponses attendues : dans le code, dans des fichiers séparés, dans la configuration du projet.
Cette question prépare l'exploration de la configuration TypeScript et du fichier tsconfig.json.
Transition : "Les types sont définis dans notre code et notre configuration — voyons comment React + TypeScript s'organisent dans un vrai projet."
-->
