# Mini-Projet TypeScript : Station Spatiale

## 🎯 Objectif Général

Créer un système de gestion de ressources pour une station spatiale en utilisant les **generics TypeScript** pour garantir la réutilisabilité et la type-safety.

**Durée estimée** : 1-2 heures

---

## 📖 Contexte

Vous gérez une station spatiale qui doit stocker différents types de ressources (carburant, nourriture, équipement) et gérer des conteneurs spécialisés. Chaque type de conteneur ne peut stocker qu'un type spécifique de ressource.

Votre mission : utiliser les generics pour créer un système flexible et type-safe.

---

## 🎓 Prérequis

- Maîtriser les interfaces et types
- Comprendre les classes TypeScript
- Connaître les fonctions typées
- Comprendre les imports/exports ES modules

---

## 🚀 Mise en Place

Ce projet sera organisé en **modules séparés** pour apprendre la modularisation du code.

Créez la structure suivante dans un dossier `space-station/` :

```
space-station/
├── types.ts          # Définitions de types et interfaces
├── container.ts      # Classe Container générique
├── manager.ts        # Classe StationManager
├── utils.ts          # Fonctions utilitaires génériques
└── index.ts          # Point d'entrée et tests
```

---

## 🏗️ Partie 1 : Module des Types (`types.ts`)

### Étape 1.1 : Interface générique pour les ressources

Dans `types.ts`, créez une interface `Resource<T>` avec :
- `id` : identifiant unique
- `name` : nom de la ressource
- `quantity` : quantité disponible
- `data` : données spécifiques de type `T`

**💡 Pourquoi ?** Le généric `T` permet d'avoir des données différentes selon le type de ressource.

---

### Étape 1.2 : Types spécifiques de ressources

Toujours dans `types.ts`, créez trois types pour les données spécifiques :

**`FuelData`** :
- `octaneRating` : indice d'octane
- `type` : `"hydrogen" | "plasma" | "antimatter"`

**`FoodData`** :
- `calories` : nombre de calories
- `expirationDate` : date d'expiration

**`EquipmentData`** :
- `category` : `"tools" | "medical" | "scientific"`
- `condition` : `"new" | "used" | "damaged"`

---

### Étape 1.3 : Créer des alias de types

Toujours dans `types.ts`, créez des alias pour faciliter l'utilisation :
- `Fuel = Resource<FuelData>`
- `Food = Resource<FoodData>`
- `Equipment = Resource<EquipmentData>`

### Étape 1.4 : Exporter les types

**Exportez tous vos types et interfaces** avec `export` pour les rendre disponibles aux autres modules.

**💡 Pourquoi ?** Les exports permettent de partager les définitions de types entre modules.

---

## 🏗️ Partie 2 : Module Conteneur (`container.ts`)

### Étape 2.1 : Importer les types nécessaires

En haut de `container.ts`, importez les types depuis `types.ts` :

```typescript
import type { Resource } from './types.js';
```

**💡 Pourquoi ?** Le mot-clé `type` indique un import de type uniquement (optimisation).

---

### Étape 2.2 : Classe Container<T>

Créez une classe générique `Container<T extends { id: string }>` avec :
- Une propriété privée `items: T[]`
- `add(item: T): void` : ajoute un élément
- `remove(id: string): T | undefined` : retire un élément par ID
- `getAll(): T[]` : retourne tous les éléments
- `count(): number` : retourne le nombre d'éléments

**💡 Pourquoi ?** La contrainte `extends { id: string }` garantit que tout élément a un `id`.

---

### Étape 2.3 : Exporter la classe

Exportez la classe `Container` avec `export class Container<T extends { id: string }>`.

**💡 Pourquoi ?** Cela permet aux autres modules d'utiliser votre conteneur générique.

---

## 🏗️ Partie 3 : Module Utilitaires (`utils.ts`)

### Étape 3.1 : Fonction de recherche

Dans `utils.ts`, créez et **exportez** une fonction générique :

```typescript
export function findByName<T extends { name: string }>(items: T[], name: string): T | undefined
```

Cette fonction recherche un élément par nom.

**💡 Pourquoi ?** Cette fonction fonctionne avec n'importe quel type ayant une propriété `name`.

---

### Étape 3.2 : Fonction de filtrage

Toujours dans `utils.ts`, créez et **exportez** :

```typescript
export function filterByQuantity<T extends { quantity: number }>(items: T[], minQuantity: number): T[]
```

Cette fonction filtre les ressources ayant au moins `minQuantity`.

---

### Étape 3.3 : Fonction de transformation

Créez et **exportez** une fonction générique :

```typescript
export function mapToSummary<T extends { id: string; name: string }>(items: T[]): { id: string; name: string }[]
```

Cette fonction extrait uniquement l'ID et le nom.

**💡 Pourquoi ?** Utile pour créer des résumés sans exposer toutes les données.

---

### Étape 3.4 : Fonction de création de ressource

Créez et **exportez** une fonction avec inférence de type :

```typescript
export function createResource<T>(id: string, name: string, quantity: number, data: T): Resource<T>
```

**💡 Pourquoi ?** TypeScript inférera automatiquement le type `T` depuis l'argument `data`.

---

## 🏗️ Partie 4 : Module Manager (`manager.ts`)

### Étape 4.1 : Importer les dépendances

En haut de `manager.ts`, importez ce dont vous avez besoin :

```typescript
import { Container } from './container.js';
```

**💡 Pourquoi ?** Le manager utilise le `Container` créé précédemment.

---

### Étape 4.2 : Classe StationManager<T>

Créez et **exportez** une classe `StationManager<T extends { id: string; quantity: number }>` qui :
- Utilise un `Container<T>` en interne (propriété privée)
- Méthode `addResource(resource: T): void`
- Méthode `getTotalQuantity(): number` : somme des quantités
- Méthode `getLowStock(threshold: number): T[]` : ressources sous le seuil

**💡 Pourquoi ?** Cette classe réutilise le `Container` générique pour gérer les ressources.

---

## 🏗️ Partie 5 : Point d'Entrée (`index.ts`)

### Étape 5.1 : Importer tous les modules

Dans `index.ts`, importez tout ce dont vous avez besoin :

```typescript
import type { Fuel, Food, Equipment } from './types.js';
import { Container } from './container.js';
import { StationManager } from './manager.js';
import { createResource, findByName, filterByQuantity } from './utils.js';
```

**💡 Pourquoi ?** Le fichier `index.ts` orchestre tous les modules.

---

### Étape 5.2 : Créer des ressources avec inférence de type

Utilisez `createResource()` **sans spécifier le type explicitement** :

```typescript
const hydrogen = createResource("f1", "Hydrogen", 100, { 
  octaneRating: 95, 
  type: "hydrogen" as const 
});
```

TypeScript doit inférer automatiquement le type `Resource<FuelData>`.

**💡 Pourquoi ?** L'inférence de type rend le code plus concis.

---

### Étape 5.3 : Créer des conteneurs et managers

Créez des instances pour tester :
- `fuelContainer: Container<Fuel>`
- `foodManager: StationManager<Food>`
- etc.

Ajoutez vos ressources et testez les méthodes.

---

### Étape 5.4 : Tester les fonctions utilitaires

Utilisez `findByName()`, `filterByQuantity()`, etc. pour vérifier que tout fonctionne.

Ajoutez des `console.log()` pour afficher les résultats.

---

## ✅ Critères de Réussite

- [ ] Le code est organisé en **5 modules séparés** (types, container, manager, utils, index)
- [ ] Tous les exports/imports utilisent la syntaxe **ES modules** (`.js` dans les imports)
- [ ] Le code compile sans erreur TypeScript (`pnpm typecheck`)
- [ ] Le code s'exécute correctement (`pnpm 02-generics-spatial`)
- [ ] Les conteneurs n'acceptent que leur type spécifique
- [ ] Les fonctions génériques fonctionnent avec différents types
- [ ] L'inférence de type fonctionne correctement
- [ ] Aucun `any` n'est utilisé
- [ ] Les contraintes génériques empêchent les erreurs à la compilation

---

## 🎓 Concepts Clés

- **ES Modules** : Organisation du code en modules avec `import`/`export`
- **Type-only imports** : `import type` pour les imports de types uniquement
- **Generic Interfaces** : Interfaces paramétrées par un type
- **Generic Classes** : Classes réutilisables avec différents types
- **Generic Constraints** : `extends` pour limiter les types acceptés
- **Type Inference** : Laisser TypeScript déduire les types
- **Module Separation** : Séparer les responsabilités (types, logique, utilitaires)

---

## 💡 Bonus (Optionnel)

- Créer un module `transfer.ts` avec une fonction `transfer<T>(from: Container<T>, to: Container<T>, id: string): boolean`
- Créer un module `pairs.ts` avec un type `Pair<T, U>` pour associer deux ressources
- Ajouter dans `utils.ts` une fonction `groupBy<T, K extends keyof T>(items: T[], key: K): Map<T[K], T[]>`
- Créer un fichier `constants.ts` pour exporter des constantes réutilisables

---

## ⏱️ Temps Estimé

1-2 heures

---

## 🆘 Aide

Si vous êtes bloqué :
1. Commencez par créer les types sans generics
2. Ajoutez les generics progressivement
3. Testez chaque fonction individuellement
4. Utilisez l'autocomplétion de VS Code pour vérifier les types
