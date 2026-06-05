# K.School — Agent Rules

## RTK (Rust Token Killer) — Toujours utiliser

<!-- rtk-instructions v2 -->

**Toujours préfixer les commandes avec `rtk`**. Si RTK a un filtre dédié, il l'utilise. Sinon, la commande passe telle quelle. RTK est toujours sûr à utiliser.

**Important** : Même dans les chaînes avec `&&`, utiliser `rtk` :
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

### Commandes RTK par workflow

**Build & Compile** (80-90% savings)
```bash
rtk tsc        # TypeScript errors groupés par fichier (83%)
rtk lint       # ESLint/Biome violations groupées (84%)
rtk next build # Next.js build avec route metrics (87%)
```

**Test** (60-99% savings)
```bash
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk jest                # Jest failures only (99.5%)
```

**Git** (59-80% savings)
```bash
rtk git status   # Compact status
rtk git log      # Compact log (fonctionne avec tous les flags git)
rtk git diff     # Compact diff (80%)
rtk git add      # Confirmations ultra-compactes (59%)
rtk git commit   # Confirmations ultra-compactes (59%)
rtk git push     # Confirmations ultra-compactes
```

**JavaScript/TypeScript** (70-90% savings)
```bash
rtk pnpm install    # Compact install output (90%)
rtk pnpm list       # Compact dependency tree (70%)
rtk pnpm outdated   # Compact outdated packages (80%)
```

**Files & Search** (60-75% savings)
```bash
rtk ls <path>        # Tree format, compact (65%)
rtk grep <pattern>   # Search groupé par fichier (75%)
rtk find <pattern>   # Find groupé par répertoire (70%)
```

**Meta**
```bash
rtk gain            # Voir les statistiques de savings
rtk gain --history  # Historique des commandes avec savings
```

<!-- /rtk-instructions -->
