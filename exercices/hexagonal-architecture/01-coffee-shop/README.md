# Exercice — Coffee Shop Deluxe (NestJS + Hexagonal + CQS)

## 🎯 Objectif

Construire une API NestJS illustrant l'**Architecture Hexagonale** avec séparation **CQS** (Command Query Separation), et une UI web pour démonstration interactive.

**Durée estimée** : 3-4h (live coding progressif)

---

## 📖 Contexte métier

Vous développez le système de gestion d'une **machine à café connectée** pour un café haut de gamme.

### Règles métier

1. **Recettes** : Espresso, Latte, Cappuccino, Americano (chacune avec ingrédients spécifiques)
2. **Ingrédients** : Café, Eau, Lait, Chocolat (stock limité)
3. **Commande** : Client paie → machine prépare → ingrédients consommés → vente enregistrée
4. **Tarification** : Prix de base + multiplicateur par ingrédient
5. **Réapprovisionnement** : Admin peut ajouter des ingrédients au stock

### Vocabulaire métier

| Concept | Terme |
|---------|-------|
| Boisson préparée | `Beverage` |
| Ingrédient avec quantité | `Ingredient` |
| Recette avec ingrédients | `Recipe` |
| Historique de vente | `Sale` |
| Erreur métier | `DomainError` |

---

## 🏗️ Structure finale attendue

```
src/
├── domain/                        # Coeur métier (0 dépendance externe)
│   ├── models/
│   │   ├── beverage.vo.ts         # Value Object
│   │   ├── ingredient.vo.ts       # Value Object
│   │   ├── recipe.vo.ts           # Value Object
│   │   └── sale.vo.ts             # Value Object
│   └── errors/
│       └── domain.error.ts        # Exceptions métier
│
├── application/                   # Cas d'usage (CQS)
│   ├── ports/                     # Interfaces (dépendances externes)
│   │   ├── ingredient-provider.port.ts
│   │   ├── recipe-repository.port.ts
│   │   └── sale-repository.port.ts
│   │
│   ├── queries/                   # Use Cases Query = interfaces uniquement
│   │   ├── list-recipes.query.ts
│   │   ├── check-stock.query.ts
│   │   └── get-sales-history.query.ts
│   │
│   └── commands/                  # Use Cases Command = classes complètes
│       ├── prepare-beverage/
│       │   ├── prepare-beverage.command.ts
│       │   ├── prepare-beverage.handler.ts
│       │   └── prepare-beverage.result.ts
│       └── restock-ingredient/
│           ├── restock-ingredient.command.ts
│           ├── restock-ingredient.handler.ts
│           └── restock-ingredient.result.ts
│
├── infrastructure/                # Adapters (implémentations concrètes)
│   ├── persistence/
│   │   ├── in-memory/
│   │   │   ├── in-memory-ingredient.provider.ts
│   │   │   ├── in-memory-recipe.repository.ts
│   │   │   └── in-memory-sale.repository.ts
│   │   └── typeorm/               # (bonus) Vraie BDD
│   │       └── ...
│   └── external/
│       └── weather-api.adapter.ts # (bonus) API externe
│
├── presentation/                  # Interface utilisateurs (NestJS)
│   ├── api/
│   │   ├── coffee.controller.ts
│   │   ├── coffee.module.ts
│   │   └── dto/
│   │       ├── prepare-beverage.dto.ts
│   │       ├── restock-ingredient.dto.ts
│   │       └── beverage-response.dto.ts
│   └── static/
│       └── index.html             # UI DaisyUI
│
├── app.module.ts
├── main.ts
│
└── test/
    ├── unit/                      # Tests domaine (2ms)
    └── integration/               # Tests avec adapters mémoire
```

---

## 🧩 Vue d'ensemble CQS

### Query (Port uniquement)

Une Query ne fait **que lire**. Elle n'a pas besoin de logique métier complexe.

```typescript
// application/queries/list-recipes.query.ts
export interface ListRecipesQuery {
  execute(): Promise<RecipeResume[]>;
}
```

**Implémentation** : L'adapter implémente directement l'interface.

### Command (Classe complète)

Un Command **modifie l'état**. Il contient toute la logique métier.

```typescript
// application/commands/prepare-beverage/prepare-beverage.handler.ts
@Injectable()
export class PrepareBeverageHandler {
  async execute(command: PrepareBeverageCommand): Promise<PrepareBeverageResult> {
    // 1. Valider la recette
    // 2. Vérifier les ingrédients
    // 3. Calculer le prix
    // 4. Consommer les ingrédients
    // 5. Enregistrer la vente
    // 6. Retourner le résultat
  }
}
```

---

## 🎨 UI Client (DaisyUI)

Page web statique servie par NestJS (`@nestjs/serve-static`) avec :

- 📋 Liste des recettes disponibles (Query)
- 💰 Affichage du stock en temps réel (Query)
- ☕ Bouton "Commander" avec sélection (Command)
- 📊 Historique des ventes (Query)
- 🔧 Panel admin pour réapprovisionnement (Command)
- 🎨 Design moderne avec DaisyUI

---

## 📝 Instructions d'implémentation (Live Coding)

### Phase 1 — Setup & Domaine (30min)

**Étape 1.1** — Initialiser le projet

```bash
npm init -y
pnpm add @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata
pnpm add -D @types/node typescript ts-node vitest @vitest/ui
npx tsc --init
```

**Étape 1.2** — Créer le dossier `src/domain/models/`

Implémenter les Value Objects :
- `Ingredient` : `{ name: string, quantity: number }`
- `Recipe` : `{ name: string, ingredients: Ingredient[] }`
- `Beverage` : `{ name: string, price: number }`
- `Sale` : `{ beverage: Beverage, timestamp: Date }`

**Étape 1.3** — Créer `src/domain/errors/domain.error.ts`

Définir les exceptions métier :
- `DomainError` (classe parente)
- `IngredientInsufficientError`
- `RecipeNotFoundError`
- `InsufficientFundsError`

**Checkpoint** : `pnpm test` passe avec 0 test (structure OK)

---

### Phase 2 — Ports (Interfaces) (20min)

**Étape 2.1** — Créer `src/application/ports/`

Implémenter les interfaces :
- `IngredientProvider` : `find()`, `checkAvailability()`, `consume()`, `list()`
- `RecipeRepository` : `findByName()`, `listAll()`
- `SaleRepository` : `record()`, `listHistory()`

**🔍 Explication CQS** :
> Ces interfaces seront utilisées par les Queries ET les Commands. La différence : Query utilise `listAll()`, Command utilise `findByName()`.

---

### Phase 3 — Query Use Cases (Ports uniquement) (15min)

**Étape 3.1** — Créer `src/application/queries/`

Implémenter les interfaces Query :
- `ListRecipesQuery` : `execute(): Promise<RecipeResume[]>`
- `CheckStockQuery` : `execute(): Promise<Ingredient[]>`
- `GetSalesHistoryQuery` : `execute(): Promise<Sale[]>`

**🔍 Point pédagogique** :
> "Une Query ne fait QUE lire. Elle n'a pas besoin de logique métier complexe, donc on reste au niveau interface. L'implémentation sera dans l'adapter."

---

### Phase 4 — Command Use Cases (Classes complètes) (45min)

**Étape 4.1** — Créer `src/application/commands/prepare-beverage/`

Implémenter :
- `PrepareBeverageCommand` : `{ recipeName: string, amountPaid: number }`
- `PrepareBeverageResult` : `{ beverage: Beverage, changeReturned: number, success: boolean }`
- `PrepareBeverageHandler` : Logique complète

**Logique du handler** :
1. Trouver la recette
2. Vérifier les ingrédients
3. Calculer le prix (base + 0.5€ par ingrédient)
4. Vérifier les fonds
5. Consommer les ingrédients
6. Enregistrer la vente
7. Retourner le résultat

**Étape 4.2** — Créer `src/application/commands/restock-ingredient/`

Implémenter :
- `RestockIngredientCommand` : `{ ingredientName: string, quantity: number }`
- `RestockIngredientHandler` : Logique simple

---

### Phase 5 — Adapters In-Memory (30min)

**Étape 5.1** — Créer `src/infrastructure/persistence/in-memory/`

Implémenter les adapters :
- `InMemoryRecipeRepository` : Implémente `RecipeRepository` + `ListRecipesQuery`
- `InMemoryIngredientProvider` : Implémente `IngredientProvider` + `CheckStockQuery`
- `InMemorySaleRepository` : Implémente `SaleRepository` + `GetSalesHistoryQuery`

**💡 Astuce** : Un adapter peut implémenter à la fois un Port ET une Query :

```typescript
class InMemoryRecipeRepository 
  implements RecipeRepository, ListRecipesQuery {
  // Une seule classe, deux rôles
}
```

---

### Phase 6 — Module Nest & Injection (20min)

**Étape 6.1** — Créer `src/presentation/api/coffee.module.ts`

Configurer les providers :
- Commands (classes avec logique)
- Queries (interfaces → implémentations)
- Ports (interfaces → adapters)

Utiliser `@Inject()` pour injecter les dépendances.

---

### Phase 7 — Controller API (20min)

**Étape 7.1** — Créer `src/presentation/api/coffee.controller.ts`

Implémenter les endpoints :
- `GET /api/coffee/recipes` → Query
- `GET /api/coffee/stock` → Query
- `GET /api/coffee/sales` → Query
- `POST /api/coffee/prepare` → Command
- `POST /api/coffee/restock` → Command

---

### Phase 8 — UI DaisyUI (30min)

**Étape 8.1** — Créer `src/presentation/static/index.html`

Implémenter :
- Affichage du stock (fetch `/api/coffee/stock`)
- Liste des recettes (fetch `/api/coffee/recipes`)
- Formulaire de commande (POST `/api/coffee/prepare`)
- Panel admin (POST `/api/coffee/restock`)
- Toast notifications DaisyUI

---

## ✅ Critères de réussite

| Checkpoint | Validation |
|------------|------------|
| **Domaine pur** | `src/domain` n'importe rien de NestJS |
| **CQS respecté** | Queries = interfaces, Commands = classes |
| **Inversion dépendances** | Application dépend de Ports, pas d'Adapters |
| **Swap adapters** | Changer InMemory ↔ TypeORM en 1 ligne dans Module |
| **UI fonctionnelle** | Page DaisyUI interactive avec tous les endpoints |
| **Tests unitaires** | Domaine testable sans `TestingModule` |

---

## 🎓 Questions de réflexion (pour clore la session)

1. **Pourquoi les Queries sont des interfaces et pas des classes ?**
2. **Qu'est-ce qui empêche le domaine de fuiter vers NestJS ?**
3. **Comment ajouter une "Beverage of the Day" basée sur la météo sans polluer le domaine ?**
4. **Dans quel cas un Query pourrait devenir une Command ?**
5. **Pourquoi un adapter implémente à la fois un Port ET une Query ?**

---

## 📚 Ressources

- [CQS by Martin Fowler](https://martinfowler.com/bliki/CommandQuerySeparation.html)
- [NestJS Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)
- [DaisyUI Components](https://daisyui.com/components/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

---

## 🚀 Bonus (si temps)

- Ajouter une vraie BDD avec TypeORM
- Intégrer une API météo pour "Beverage of the Day"
- Ajouter des tests e2e avec Supertest
- Implémenter un système de loyauté (points)
