# Structure Summary — Coffee Shop Exercise

## 📁 Complete File Structure

```
01-coffee-shop/
├── src/
│   ├── domain/                                    # Pure business logic
│   │   ├── models/
│   │   │   ├── ingredient.vo.ts                  # [STUB] Ingredient value object
│   │   │   ├── recipe.vo.ts                      # [STUB] Recipe value object
│   │   │   ├── beverage.vo.ts                    # [STUB] Beverage value object
│   │   │   └── sale.vo.ts                        # [STUB] Sale value object
│   │   └── errors/
│   │       └── domain.error.ts                   # [STUB] Domain exceptions
│   │
│   ├── application/                              # Use cases (CQS)
│   │   ├── ports/                                # Interfaces (contracts)
│   │   │   ├── ingredient-provider.port.ts       # [STUB] Ingredient access interface
│   │   │   ├── recipe-repository.port.ts         # [STUB] Recipe access interface
│   │   │   └── sale-repository.port.ts           # [STUB] Sale recording interface
│   │   │
│   │   ├── queries/                              # Read-only use cases (interfaces)
│   │   │   ├── list-recipes.query.ts             # [STUB] List all recipes
│   │   │   ├── check-stock.query.ts              # [STUB] Check ingredient stock
│   │   │   └── get-sales-history.query.ts        # [STUB] Get sales history
│   │   │
│   │   └── commands/                             # State-modifying use cases (classes)
│   │       ├── prepare-beverage/
│   │       │   ├── prepare-beverage.command.ts   # [STUB] Command object
│   │       │   ├── prepare-beverage.result.ts    # [STUB] Result object
│   │       │   └── prepare-beverage.handler.ts   # [STUB] Command handler (logic)
│   │       └── restock-ingredient/
│   │           ├── restock-ingredient.command.ts # [STUB] Command object
│   │           └── restock-ingredient.handler.ts # [STUB] Command handler (logic)
│   │
│   ├── infrastructure/                           # Adapters (implementations)
│   │   └── persistence/
│   │       └── in-memory/
│   │           ├── in-memory-recipe.repository.ts       # [STUB] Recipe adapter
│   │           ├── in-memory-ingredient.provider.ts     # [STUB] Ingredient adapter
│   │           └── in-memory-sale.repository.ts         # [STUB] Sale adapter
│   │
│   ├── presentation/                             # NestJS layer
│   │   ├── api/
│   │   │   ├── coffee.controller.ts              # [STUB] API endpoints
│   │   │   ├── coffee.module.ts                  # [STUB] NestJS module
│   │   │   └── dto/
│   │   │       ├── prepare-beverage.dto.ts       # [STUB] Request DTO
│   │   │       └── restock-ingredient.dto.ts     # [STUB] Request DTO
│   │   └── static/
│   │       └── index.html                        # [GENERATED] DaisyUI web UI
│   │
│   ├── app.module.ts                             # [COMPLETE] Root NestJS module
│   └── main.ts                                   # [COMPLETE] Application entry point
│
├── test/                                         # Tests directory (to create)
│   ├── unit/                                     # Domain tests
│   └── integration/                              # Adapter + Command tests
│
├── package.json                                  # [COMPLETE] Dependencies
├── tsconfig.json                                 # [COMPLETE] TypeScript config
├── nest-cli.json                                 # [COMPLETE] NestJS CLI config
├── vitest.config.ts                              # [COMPLETE] Vitest config
├── .gitignore                                    # [COMPLETE] Git ignore rules
├── README.md                                     # [COMPLETE] Full exercise guide
├── GETTING_STARTED.md                            # [COMPLETE] Quick start guide
└── STRUCTURE_SUMMARY.md                          # [THIS FILE]
```

---

## 🎯 File Status Legend

| Status | Meaning | Action |
|--------|---------|--------|
| `[STUB]` | Placeholder with comments | Implement during live coding |
| `[COMPLETE]` | Ready to use | No changes needed |
| `[GENERATED]` | Auto-generated UI | Already functional |

---

## 📊 Implementation Checklist

### Domain Layer (7 files)
- [ ] `ingredient.vo.ts` — Value object with name, quantity
- [ ] `recipe.vo.ts` — Value object with name, ingredients array
- [ ] `beverage.vo.ts` — Value object with name, price
- [ ] `sale.vo.ts` — Value object with beverage, timestamp
- [ ] `domain.error.ts` — Base error + 3 specific errors

### Application Ports (3 files)
- [ ] `ingredient-provider.port.ts` — Interface with 4 methods
- [ ] `recipe-repository.port.ts` — Interface with 2 methods
- [ ] `sale-repository.port.ts` — Interface with 2 methods

### Application Queries (3 files)
- [ ] `list-recipes.query.ts` — Interface returning RecipeResume[]
- [ ] `check-stock.query.ts` — Interface returning Ingredient[]
- [ ] `get-sales-history.query.ts` — Interface returning Sale[]

### Application Commands (5 files)
- [ ] `prepare-beverage.command.ts` — Command class
- [ ] `prepare-beverage.result.ts` — Result class
- [ ] `prepare-beverage.handler.ts` — Handler with full logic
- [ ] `restock-ingredient.command.ts` — Command class
- [ ] `restock-ingredient.handler.ts` — Handler with logic

### Infrastructure Adapters (3 files)
- [ ] `in-memory-recipe.repository.ts` — Implements RecipeRepository + ListRecipesQuery
- [ ] `in-memory-ingredient.provider.ts` — Implements IngredientProvider + CheckStockQuery
- [ ] `in-memory-sale.repository.ts` — Implements SaleRepository + GetSalesHistoryQuery

### Presentation Layer (4 files)
- [ ] `coffee.module.ts` — NestJS module with providers
- [ ] `coffee.controller.ts` — 5 API endpoints
- [ ] `prepare-beverage.dto.ts` — Request DTO
- [ ] `restock-ingredient.dto.ts` — Request DTO

**Total: 28 files to implement**

---

## 🔄 Data Flow Examples

### Query Flow (Read-only)

```
Browser
  ↓ GET /api/coffee/recipes
  ↓
CoffeeController
  ↓ inject ListRecipesQuery
  ↓
InMemoryRecipeRepository.execute()
  ↓ returns RecipeResume[]
  ↓
Browser receives JSON
```

### Command Flow (State-modifying)

```
Browser
  ↓ POST /api/coffee/prepare { recipeName, amountPaid }
  ↓
CoffeeController
  ↓ create PrepareBeverageCommand
  ↓
PrepareBeverageHandler.execute()
  ├─ RecipeRepository.findByName()
  ├─ IngredientProvider.checkAvailability()
  ├─ IngredientProvider.consume()
  ├─ SaleRepository.record()
  └─ returns PrepareBeverageResult
  ↓
Browser receives { beverage, changeReturned, success }
```

---

## 🧪 Testing Structure (to create)

```
test/
├── unit/
│   ├── domain/
│   │   ├── models/
│   │   │   ├── ingredient.vo.test.ts
│   │   │   ├── recipe.vo.test.ts
│   │   │   ├── beverage.vo.test.ts
│   │   │   └── sale.vo.test.ts
│   │   └── errors/
│   │       └── domain.error.test.ts
│   │
│   └── application/
│       └── commands/
│           ├── prepare-beverage.handler.test.ts
│           └── restock-ingredient.handler.test.ts
│
└── integration/
    └── coffee.controller.test.ts
```

---

## 🎓 Learning Objectives by Phase

| Phase | Concept | Files |
|-------|---------|-------|
| 1 | Value Objects, Immutability | domain/models/*.vo.ts |
| 2 | Ports, Interfaces, Contracts | application/ports/*.port.ts |
| 3 | CQS, Read-only Operations | application/queries/*.query.ts |
| 4 | Commands, Business Logic | application/commands/*/*.handler.ts |
| 5 | Adapters, Dependency Inversion | infrastructure/persistence/in-memory/*.ts |
| 6 | NestJS DI, Module Configuration | presentation/api/coffee.module.ts |
| 7 | REST API, DTOs | presentation/api/coffee.controller.ts |

---

## 🔍 Key Implementation Details

### Ingredient Value Object
```typescript
class Ingredient {
  constructor(public name: string, public quantity: number) {}
}
```

### Recipe Value Object
```typescript
class Recipe {
  constructor(public name: string, public ingredients: Ingredient[]) {}
}
```

### IngredientProvider Port
```typescript
interface IngredientProvider {
  find(name: string): Promise<Ingredient | null>;
  checkAvailability(name: string, quantity: number): Promise<boolean>;
  consume(name: string, quantity: number): Promise<void>;
  list(): Promise<Ingredient[]>;
}
```

### PrepareBeverage Handler Logic
```
1. Find recipe by name
2. Check all ingredients available
3. Calculate price (200¢ base + 50¢ per ingredient)
4. Verify customer paid enough
5. Consume ingredients from stock
6. Record sale in history
7. Return result with change
```

### In-Memory Adapter Pattern
```typescript
@Injectable()
class InMemoryRecipeRepository 
  implements RecipeRepository, ListRecipesQuery {
  
  private recipes: Recipe[] = [...];
  
  // RecipeRepository methods
  async findByName(name: string): Promise<Recipe | null> { ... }
  
  // ListRecipesQuery method
  async execute(): Promise<RecipeResume[]> { ... }
}
```

---

## 🚀 Getting Started

1. **Read** `README.md` for full context
2. **Follow** `GETTING_STARTED.md` for phase-by-phase guide
3. **Implement** files in order (domain → application → infrastructure → presentation)
4. **Test** each phase with `npm run test`
5. **Run** the app with `npm run dev`
6. **Use** the UI at `http://localhost:3000`

---

## 📚 Resources

- **CQS Pattern**: https://martinfowler.com/bliki/CommandQuerySeparation.html
- **Hexagonal Architecture**: https://alistair.cockburn.us/hexagonal-architecture/
- **NestJS Docs**: https://docs.nestjs.com/
- **Vitest**: https://vitest.dev/
- **DaisyUI**: https://daisyui.com/

---

Happy coding! ☕
