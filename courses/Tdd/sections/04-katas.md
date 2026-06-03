---
layout: cover
background: https://cover.sli.dev?6
---

# Chapitre 04 - Katas

<!--
90 min de pratique autonome — 20 min Pig Latin, 25 min String Calculator, 35 min Roman Numerals + 10 min correction collective
-->

---
layout: default
---

# Katas

Les regles de la session

<div v-click>

- Travailler **seul** — chacun fait son propre cycle RGR
- **Un test a la fois** — ne pas lire les cas suivants avant que le test actuel passe
- Lancer `deno test --watch` et garder le terminal visible
- Pas de copier-coller de solution — si bloque, demander au formateur

</div>

<div v-click class="mt-6">

**Objectif de chaque kata :**
- Pas finir vite — **respecter le cycle** RED → GREEN → REFACTOR
- Chaque test doit passer au rouge avant d'ecrire le code
- Nommer les tests de facon expressive

</div>

<!--
Insister sur le fait que la vitesse n'est pas le critere — respecter le cycle l'est
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Katas

Kata 1 — Pig Latin (20 min)

::left::

**Regles** (3 regles progressives — les implementer dans cet ordre) :

<div v-click>

**Regle 1** : Si le mot commence par une voyelle (a, e, i, o, u), ajouter "ay" a la fin
- `"apple"` → `"appleay"`
- `"ear"` → `"earay"`

</div>

<div v-click class="mt-4">

**Regle 2** : Si le mot commence par une consonne, deplacer la consonne a la fin et ajouter "ay"
- `"pig"` → `"igpay"`
- `"latin"` → `"atinlay"`

</div>

<div v-click class="mt-4">

**Regle 3** : Si le mot commence par plusieurs consonnes consecutives, les deplacer toutes
- `"school"` → `"oolschay"`
- `"three"` → `"eethray"`

</div>

::right::

**Lancement**

```bash
deno task 01-pig-latin
```

<div v-click class="mt-4">

**Premiers tests suggeres** (dans l'ordre) :

```ts
// Test 1 — mot commencant par une voyelle
Deno.test("should add ay when word starts with vowel", ...)

// Test 2 — mot commencant par une consonne
Deno.test("should move consonant to end and add ay", ...)

// Test 3 — plusieurs consonnes
Deno.test("should move consonant cluster to end", ...)
```

</div>

<!--
Les regles sont a faire dans l'ordre — ne pas sauter a la regle 3 avant que les tests 1 et 2 passent
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Katas

Kata 2 — String Calculator (25 min)

::left::

**Regles** (a implementer dans l'ordre — baby steps) :

<div v-click>

1. Chaine vide → retourner 0
2. Un seul nombre `"5"` → retourner 5
3. Deux nombres separes par virgule `"1,2"` → retourner 3
4. N nombres `"1,2,3,4"` → retourner leur somme
5. Retourner une erreur si un nombre est negatif : `"1,-2,3"` → `Error("negatives not allowed: -2")`

</div>

::right::

**Lancement**

```bash
deno task 02-string-calculator
```

<div v-click class="mt-4">

**Signature attendue** :

```ts
function add(numbers: string): number
```

</div>

<!--
L'erreur pour les negatifs doit lister TOUS les negatifs trouves : `"1,-2,-5"` → `Error("negatives not allowed: -2, -5")`
-->

---
layout: two-cols-header
layoutClass: gap-x-4
---

# Katas

Kata 3 — Roman Numerals (35 min)

::left::

**Regles** — Convertir un entier en chiffres romains

<div v-click>

Valeurs de base :

| Valeur | Symbole |
|--------|---------|
| 1 | I |
| 4 | IV |
| 5 | V |
| 9 | IX |
| 10 | X |
| 40 | XL |
| 50 | L |
| 90 | XC |
| 100 | C |
| 400 | CD |
| 500 | D |
| 900 | CM |
| 1000 | M |

</div>

::right::

**Lancement**

```bash
deno task 03-roman-numerals
```

<div v-click class="mt-4">

**Exemples** :
- `1` → `"I"`
- `4` → `"IV"`
- `9` → `"IX"`
- `14` → `"XIV"`
- `42` → `"XLII"`
- `1994` → `"MCMXCIV"`

</div>

<div v-click class="mt-4">

**Conseil** : commencer par les cas simples (1, 2, 3) avant les cas soustractifs (4, 9, 40...)

</div>

<!--
Ce kata force a decouvrir la technique de la table de valeurs-cles — ne pas donner l'astuce, laisser les apprenants la trouver par les tests
-->

---
layout: center
---

# Katas

C'est parti — `deno task 01-pig-latin`

Le formateur passe dans les rangs. Correction collective a la fin de chaque kata.

<!--
Ne pas rester sur cette slide — lancer les apprenants immediatement
-->
