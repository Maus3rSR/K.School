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

---

## 🏗️ Partie 1 : Les Bases

### Étape 1.1 : Interface générique pour les ressources

Créez une interface `Resource<T>` avec :
- `id` : identifiant unique
- `name` : nom de la ressource
- `quantity` : quantité disponible
- `data` : données spécifiques de type `T`

**💡 Pourquoi ?** Le généric `T` permet d'avoir des données différentes selon le type de ressource.

---

### Étape 1.2 : Types spécifiques de ressources

Créez trois types pour les données spécifiques :

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

### Étape 1.3 : Créer des ressources typées

Créez des alias de types pour faciliter l'utilisation :
- `Fuel = Resource<FuelData>`
- `Food = Resource<FoodData>`
- `Equipment = Resource<EquipmentData>`

Créez ensuite 2-3 exemples de chaque type de ressource.

---

## 🏗️ Partie 2 : Conteneur Générique

### Étape 2.1 : Classe Container<T>

Créez une classe générique `Container<T>` avec :
- Une propriété privée `items: T[]`
- `add(item: T): void` : ajoute un élément
- `remove(id: string): T | undefined` : retire un élément par ID
- `getAll(): T[]` : retourne tous les éléments
- `count(): number` : retourne le nombre d'éléments

**💡 Pourquoi ?** Un conteneur générique peut stocker n'importe quel type, mais un conteneur spécifique ne stocke qu'un seul type.

---

### Étape 2.2 : Contraintes génériques

Modifiez `Container<T>` pour ajouter une contrainte : `T extends { id: string }`.

**💡 Pourquoi ?** Cela garantit que tout élément stocké a un `id`, nécessaire pour la méthode `remove()`.

---

### Étape 2.3 : Créer des conteneurs spécialisés

Créez trois conteneurs :
- `fuelContainer: Container<Fuel>`
- `foodContainer: Container<Food>`
- `equipmentContainer: Container<Equipment>`

Ajoutez vos ressources créées précédemment dans les conteneurs appropriés.

---

## 🏗️ Partie 3 : Fonctions Génériques

### Étape 3.1 : Fonction de recherche

Créez une fonction générique `findByName<T extends { name: string }>(items: T[], name: string): T | undefined` qui recherche un élément par nom.

**💡 Pourquoi ?** Cette fonction fonctionne avec n'importe quel type ayant une propriété `name`.

---

### Étape 3.2 : Fonction de filtrage

Créez une fonction générique `filterByQuantity<T extends { quantity: number }>(items: T[], minQuantity: number): T[]` qui filtre les ressources ayant au moins `minQuantity`.

---

### Étape 3.3 : Fonction de transformation

Créez une fonction générique `mapToSummary<T extends { id: string; name: string }>(items: T[]): { id: string; name: string }[]` qui extrait uniquement l'ID et le nom.

**💡 Pourquoi ?** Utile pour créer des résumés sans exposer toutes les données.

---

## 🏗️ Partie 4 : Station Manager

### Étape 4.1 : Classe StationManager<T>

Créez une classe `StationManager<T extends { id: string; quantity: number }>` qui :
- Utilise un `Container<T>` en interne
- Méthode `addResource(resource: T): void`
- Méthode `getTotalQuantity(): number` : somme des quantités
- Méthode `getLowStock(threshold: number): T[]` : ressources sous le seuil

---

### Étape 4.2 : Créer des managers spécialisés

Créez trois managers :
- `fuelManager: StationManager<Fuel>`
- `foodManager: StationManager<Food>`
- `equipmentManager: StationManager<Equipment>`

Testez les méthodes avec vos données.

---

## 🏗️ Partie 5 : Type Inference

### Étape 5.1 : Fonction avec inférence

Créez une fonction `createResource<T>(id: string, name: string, quantity: number, data: T): Resource<T>` qui crée une ressource.

Testez-la **sans spécifier le type explicitement** :
```typescript
const fuel = createResource("f1", "Hydrogen", 100, { octaneRating: 95, type: "hydrogen" });
```

TypeScript doit inférer automatiquement que `fuel` est de type `Resource<FuelData>`.

---

## ✅ Critères de Réussite

- [ ] Le code compile sans erreur TypeScript
- [ ] Les conteneurs n'acceptent que leur type spécifique
- [ ] Les fonctions génériques fonctionnent avec différents types
- [ ] L'inférence de type fonctionne correctement
- [ ] Aucun `any` n'est utilisé
- [ ] Les contraintes génériques empêchent les erreurs à la compilation

---

## 🎓 Concepts Clés

- **Generic Interfaces** : Interfaces paramétrées par un type
- **Generic Classes** : Classes réutilisables avec différents types
- **Generic Constraints** : `extends` pour limiter les types acceptés
- **Type Inference** : Laisser TypeScript déduire les types
- **Type Aliases** : Simplifier l'utilisation des generics

---

## 💡 Bonus (Optionnel)

- Ajouter une méthode `transfer<T>(from: Container<T>, to: Container<T>, id: string): boolean`
- Créer un type `Pair<T, U>` pour associer deux ressources
- Implémenter une fonction `groupBy<T, K extends keyof T>(items: T[], key: K): Map<T[K], T[]>`

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
