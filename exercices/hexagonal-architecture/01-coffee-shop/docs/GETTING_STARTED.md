# Getting Started — Coffee Shop Exercise

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Understand the Structure

```
src/
├── domain/          # Pure business logic (no external dependencies)
├── application/     # Use cases (CQS: Queries + Commands)
├── infrastructure/  # Adapters (in-memory, database, APIs)
└── presentation/    # NestJS controllers, DTOs, UI
```

### 3. Start Live Coding

Each file has comments indicating what to implement:

```bash
pnpm dev
```

The API will start on `http://localhost:3000`

### 4. Run Tests

```bash
pnpm test
```

Watch mode (auto-rerun on changes):

```bash
pnpm test -- --watch
```

---

## 📝 Implementation Phases

### Phase 1: Domain Models (30min)
- [ ] Implement `Ingredient` value object
- [ ] Implement `Recipe` value object
- [ ] Implement `Beverage` value object
- [ ] Implement `Sale` value object
- [ ] Create domain errors

**Files to edit:**
- `src/domain/models/*.vo.ts`
- `src/domain/errors/domain.error.ts`

---

### Phase 2: Ports (20min)
- [ ] Define `IngredientProvider` interface
- [ ] Define `RecipeRepository` interface
- [ ] Define `SaleRepository` interface

**Files to edit:**
- `src/application/ports/*.port.ts`

---

### Phase 3: Query Use Cases (15min)
- [ ] Create `ListRecipesQuery` interface
- [ ] Create `CheckStockQuery` interface
- [ ] Create `GetSalesHistoryQuery` interface

**Files to edit:**
- `src/application/queries/*.query.ts`

---

### Phase 4: Command Use Cases (45min)
- [ ] Create `PrepareBeverageCommand` class
- [ ] Create `PrepareBeverageResult` class
- [ ] Implement `PrepareBeverageHandler` with full logic
- [ ] Create `RestockIngredientCommand` class
- [ ] Implement `RestockIngredientHandler`

**Files to edit:**
- `src/application/commands/prepare-beverage/*.ts`
- `src/application/commands/restock-ingredient/*.ts`

---

### Phase 5: In-Memory Adapters (30min)
- [ ] Implement `InMemoryRecipeRepository` (implements both `RecipeRepository` + `ListRecipesQuery`)
- [ ] Implement `InMemoryIngredientProvider` (implements both `IngredientProvider` + `CheckStockQuery`)
- [ ] Implement `InMemorySaleRepository` (implements both `SaleRepository` + `GetSalesHistoryQuery`)

**Files to edit:**
- `src/infrastructure/persistence/in-memory/*.ts`

---

### Phase 6: NestJS Module & Injection (20min)
- [ ] Configure `CoffeeModule` with providers
- [ ] Set up dependency injection for Commands and Queries
- [ ] Register adapters as implementations of ports

**Files to edit:**
- `src/presentation/api/coffee.module.ts`

---

### Phase 7: Controller API (20min)
- [ ] Create `GET /api/coffee/recipes` endpoint (Query)
- [ ] Create `GET /api/coffee/stock` endpoint (Query)
- [ ] Create `GET /api/coffee/sales` endpoint (Query)
- [ ] Create `POST /api/coffee/prepare` endpoint (Command)
- [ ] Create `POST /api/coffee/restock` endpoint (Command)

**Files to edit:**
- `src/presentation/api/coffee.controller.ts`

---

### Phase 8: DTOs (10min)
- [ ] Create `PrepareBeverageDto`
- [ ] Create `RestockIngredientDto`

**Files to edit:**
- `src/presentation/api/dto/*.ts`

---

## 🧪 Testing Strategy

### Unit Tests (Domain)

Test domain logic without NestJS:

```typescript
// src/domain/models/ingredient.vo.test.ts
import { describe, it, expect } from 'vitest';
import { Ingredient } from './ingredient.vo';

describe('Ingredient', () => {
  it('should create an ingredient with name and quantity', () => {
    const ingredient = new Ingredient('Coffee', 10);
    expect(ingredient.name).toBe('Coffee');
    expect(ingredient.quantity).toBe(10);
  });
});
```

### Integration Tests (Adapters + Commands)

Test with in-memory adapters:

```typescript
// src/application/commands/prepare-beverage/prepare-beverage.handler.test.ts
import { describe, it, expect } from 'vitest';
import { PrepareBeverageHandler } from './prepare-beverage.handler';
import { InMemoryRecipeRepository } from '@infrastructure/persistence/in-memory/in-memory-recipe.repository';

describe('PrepareBeverageHandler', () => {
  it('should prepare a beverage when recipe exists and ingredients available', async () => {
    const recipeRepo = new InMemoryRecipeRepository();
    const handler = new PrepareBeverageHandler(recipeRepo, ...);
    
    const result = await handler.execute(new PrepareBeverageCommand('Espresso', 300));
    expect(result.success).toBe(true);
  });
});
```

---

## 🎯 Key Concepts to Remember

### CQS (Command Query Separation)

| Query | Command |
|-------|---------|
| **Read-only** | **Modifies state** |
| Interface only | Full class implementation |
| No business logic | Contains all business logic |
| Example: `ListRecipesQuery` | Example: `PrepareBeverageHandler` |

### Hexagonal Architecture

```
┌─────────────────────────────────────┐
│        Presentation Layer           │
│  (Controllers, DTOs, UI)            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Application Layer              │
│  (Use Cases, Ports, Commands)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Domain Layer                 │
│  (Business Logic, Entities, VOs)    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     Infrastructure Layer            │
│  (Adapters, Persistence, APIs)      │
└─────────────────────────────────────┘
```

### Dependency Inversion

- **Domain** depends on nothing
- **Application** depends on Ports (interfaces)
- **Infrastructure** implements Ports
- **Presentation** depends on Application

---

## 🔍 Debugging Tips

### 1. Check if domain is pure

```bash
grep -r "import.*@nestjs" src/domain/
# Should return nothing
```

### 2. Verify port implementation

```bash
grep -r "implements.*Port" src/infrastructure/
# Should show adapters implementing ports
```

### 3. Test a single file

```bash
pnpm test -- src/domain/models/ingredient.vo.test.ts
```

### 4. Watch specific directory

```bash
pnpm test -- --watch src/application/
```

---

## 📚 Useful Commands

```bash
# Development
pnpm dev                 # Start NestJS in watch mode

# Testing
pnpm test                # Run all tests once
pnpm test -- --watch     # Watch mode
pnpm test:ui             # Open Vitest UI
pnpm test:coverage       # Generate coverage report

# Building
pnpm build               # Compile TypeScript
pnpm start               # Run compiled app
```

---

## 🚨 Common Mistakes to Avoid

❌ **Don't:**
- Import NestJS decorators in domain models
- Put business logic in controllers
- Create adapters before defining ports
- Make queries into commands

✅ **Do:**
- Keep domain pure and testable
- Use ports to define contracts
- Implement ports in adapters
- Keep queries read-only

---

## 🎓 Reflection Questions

After completing each phase, ask yourself:

1. **Why is domain pure?** → Testability, reusability, independence
2. **Why separate queries from commands?** → Different concerns, simpler reasoning
3. **Why use ports?** → Swap implementations, test with mocks
4. **Why in-memory adapters first?** → Fast feedback, no external dependencies
5. **How would you add a database?** → Implement port with TypeORM, swap in module

---

## 🆘 Getting Help

1. **Check the README.md** for full context and structure
2. **Look at comments** in stub files for guidance
3. **Run tests** to validate your implementation
4. **Compare with final structure** in README for reference

---

Happy coding! ☕
