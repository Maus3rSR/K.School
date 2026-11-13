# Composants `@k.school/slidev-addon-ui` — API et règles d'usage

Source : `packages/ui/components/*.vue`, layout `packages/ui/layouts/chapter.vue`.
Démo complète de chaque composant : `courses/Pilote` (`pnpm pilote:dev`).

Conventions communes :

- Palette sémantique (`color` / variantes) : `blue` `green` `orange` `purple` `red` `gray`.
- Prop `clicks: true` → chaque item apparaît au click (compte comme autant de clicks pour la synchronisation).
- Pour mettre du **markdown** dans un slot, laisser une ligne vide avant et après le contenu.
- Pas de `v-click` ligne par ligne autour d'un composant qui gère déjà `clicks`.

---

## Vocabulaire et concepts

### `<Tag>` — label au-dessus d'un mot

```md
Le mot-clé <Tag label="TypeScript">interface</Tag> n'est pas une notion <Tag label="React" color="purple">React</Tag>.
```

| Prop    | Type   | Défaut | Rôle                                   |
| ------- | ------ | ------ | -------------------------------------- |
| `label` | String | —      | Nom de la techno / catégorie (requis)  |
| `color` | String | `blue` | Couleur de la palette                  |

**Quand** : lever une ambiguïté sur l'origine d'un concept (TypeScript vs React, HTML vs JSX, Git vs GitHub). **Max 3 par phrase**, 1 couleur par techno dans tout le cours.

### `<KeyTerm>` — mot-clé du lexique en surbrillance

```md
La <KeyTerm>route</KeyTerm> associe une URL au code qui la traite.
```

Pas de props : le slot par défaut est le terme (souligné pointillé couleur primaire, inline, **sans fond** — visuellement distinct du code inline).

**Quand** : première occurrence significative d'un terme présent dans le lexique, ou mot-clé susceptible de tomber en QCM. **≤ 3 par slide**, uniquement dans du texte courant (prose, items de liste, `<KeyPoint>`) — jamais dans les titres, le code, les tableaux ni les props. Différence avec `<Tag>` : `Tag` annote l'origine techno d'un mot (label au-dessus), `KeyTerm` marque un terme à retenir (souligné pointillé inline).

**Règle backticks vs `<KeyTerm>`** : le code inline (backticks) = uniquement du code qu'on tape (méthode, classe, commande, valeur, nom de fichier). Un concept dans la prose (eager loading, binding, query string, lazy loading…) ne prend JAMAIS de backticks : `<KeyTerm>` s'il est au lexique / en QCM, sinon texte normal (ou gras). Deux visuels distincts = deux rôles distincts.

### `<Definition>` — concept central d'une slide

```md
<Definition term="Framework" translation="(Cadre de travail)">
Un ensemble de bibliothèques et de conventions qui structure votre code.
</Definition>
```

Props : `term` (requis), `translation` (optionnel). **Quand** : première apparition d'un concept, 1 par slide. Le terme doit aussi figurer dans le lexique (`<TermCard>`).

### `<Analogy>` — comparaison concrète

```md
<Analogy title="Comme une cuisine équipée" icon="🍳" image="https://placeholdit.com/400x400/a855f7/f1f5f9?text=Cuisine">

Texte de l'analogie (markdown).

</Analogy>
```

Props : `title` (requis), `icon` (`🧠`), `image` (URL optionnelle, affichée à gauche). **Quand** : juste après une `<Definition>`, sur la même slide ou la suivante.

### `<KeyPoint>` — à retenir / règle / avertissement

```md
<KeyPoint variant="rule" title="Règle d'or" icon="📏">

Texte court (2-3 lignes max).

</KeyPoint>
```

Props : `title` (`À retenir`), `icon` (`💡`), `variant` : `tip` (bleu) / `rule` (violet) / `warning` (orange). **Quand** : clôturer une notion. **Différence avec `<Alert>`** : `Alert` = 1 ligne dans une colonne ; `KeyPoint` = encart pleine largeur avec titre.

---

## Processus et comparaisons

### `<Steps>` — étapes, timeline, cycle

```md
<Steps
  :clicks="true"
  :items="[
    { title: 'RED', desc: 'Un test qui échoue', icon: '🔴' },
    { title: 'GREEN', desc: 'Le minimum pour passer' },
    { title: 'REFACTOR', desc: 'Améliorer sans casser' }
  ]"
/>
```

| Prop        | Type    | Défaut       | Rôle                                        |
| ----------- | ------- | ------------ | ------------------------------------------- |
| `items`     | Array   | —            | `{ title, desc?, icon? }` ; `icon` remplace le numéro |
| `direction` | String  | `horizontal` | `horizontal` (3-6 étapes, pleine largeur) / `vertical` (dans une colonne) |
| `clicks`    | Boolean | `false`      | Révélation étape par étape                  |

**Quand** : remplace TOUTE liste numérotée décrivant un processus séquentiel. `clicks="true"` autorisé même si c'est le seul bloc (exception processus séquentiel).

### `<ProsCons>` — avantages / inconvénients

```md
<ProsCons
  :pros="['Zéro config', 'Conventions claires']"
  :cons="['Écosystème jeune', 'Peu de tutoriels']"
  prosTitle="Avantages" consTitle="Inconvénients"
/>
```

**Quand** : aide à la décision. 3-4 items par colonne, équilibrés.

### `<Compare>` — anti-pattern vs bonne pratique

```md
<Compare badLabel="❌ Tout mélangé" goodLabel="✅ Séparé">
  <template #bad>

```ts
// code à éviter
```

  </template>
  <template #good>

```ts
// code recommandé
```

  </template>
</Compare>
```

**Quand** : couples ❌/✅ (code, formulation d'une User Story, commande). Remplace les deux blocs `**❌** / **✅**` écrits à la main. Code ≤ 8 lignes par côté.

### `<TableLinks>` — tables de BDD reliées par des flèches

```md
<TableLinks
  :tables="[
    { id: 'categories', name: 'categories', columns: ['id', 'name'], pk: ['id'],
      rows: [[1, 'Quiz'], [2, 'Mission']] },
    { id: 'quests', name: 'quests', columns: ['id', 'title', 'category_id'], pk: ['id'], fk: ['category_id'],
      rows: [[1, 'Salle 404', 2], [2, 'Fantôme', 3]], badRows: [1] }
  ]"
  :links="[
    { from: { table: 'quests', row: 0, col: 'category_id' }, to: { table: 'categories', row: 1 }, label: 'Quest::find(1)' },
    { from: { table: 'quests', row: 1, col: 'category_id' }, variant: 'error', label: 'id 3 inexistant' }
  ]"
/>
```

Une table `tables[]` : `id` (référencé par `links`), `name`, `columns`, `rows` ; `pk` / `fk` badgent les colonnes, `badRows` rougit des lignes, `at` fait apparaître la table au click. Une valeur de cellule peut être une **liste de variantes** `[{ v: 'Cafét', until: 2 }, { v: 'Cafèt', at: 2 }]` pour faire évoluer le contenu au fil des clicks. Une table peut aussi être un **objet** : `{ id, kind: 'object', name: '$location', props: [['name', "'Cafét'"]], at? }` — rendue en petite carte propriété/valeur.

Un lien `links[]` : `from` / `to` désignent un élément `{ table, row?, col? }` (`to` absent → flèche en pointillé « vers le vide ») ; `at` / `until` bornent la visibilité (`at <= clicks < until`) ; `variant` : `ok` (vert) / `error` (rouge) / `muted` (gris) / défaut (primaire) ; `label` : libellé au milieu de la flèche. `direction` (`row` par défaut, `column` possible) change l'empilement.

**Quand** : toute représentation de lignes de base de données, d'enregistrements ou de relations entre tables (FK, pivot, Active Record). JAMAIS Mermaid ni cartes pour ça. Les flèches sont mesurées sur le DOM réel (les tableaux rétrécissent avec `text-sm`/`text-xs` sur un conteneur parent).

---

## Environnement technique

### `<Terminal>` — commandes et sorties

```md
<Terminal
  title="bash" prompt="$" :clicks="true"
  :lines="[
    { cmd: 'git status' },
    { cmd: 'git add .', out: '' },
    { cmd: 'git commit -m \'init\'', out: '[main (root-commit) 3f2a1b] init\n 1 file changed' }
  ]"
/>
```

Props : `lines` (requis, `{ cmd?, out?, lang? }`), `title` (`bash`), `prompt` (`$`), `codePrompt` (`>>>`), `clicks`, `highlight` (défaut `true`), `legend` (défaut `false`). Le `out` conserve les retours à la ligne (`\n`). Les caractères `<`, `>` et `|` peuvent être écrits tels quels dans `cmd`/`out` — pas besoin de séquences d'échappement.

**Coloration par rôles** (`highlight`, activée par défaut ; `highlight=false` retrouve l'affichage uniforme) : chaque `cmd` est découpée en tokens colorés selon leur rôle — **commande** (1er token, bleu clair `#7dd3fc` semi-gras), **sous-commande** (ambre `#fcd34d`), **action** (vert menthe `#86efac`, uniquement après `artisan` ou `compose`), **séparateur** (`:` rose `#fda4af`, dans les actions composées `mot:mot` comme `make:migration`), **option** (lavande `#c4b5fd`, tokens en `-`), **argument** (gris clair `#e2e8f0`). Une chaîne entre guillemets compte pour **un** token ; les `:` d'une URL ou d'un argument ne sont pas séparés. Exemples :

| Commande | Découpage |
|---|---|
| `docker compose up -d` | docker · compose · up · `-d` |
| `sail artisan make:migration create_x` | sail · artisan · make `:` migration · `create_x` |
| `git commit -m "msg"` | git · commit · `-m` · `"msg"` |
| `sail up -d` | sail · up · `-d` |

`legend=true` ajoute une ligne de pastilles en bas du terminal listant les **rôles réellement présents** dans les commandes affichées (ex. `commande · sous-commande · action · séparateur · option · argument`) — utile pour introduire le vocabulaire d'une commande.

**Lignes de code** (`lang: 'php'` sur une entrée, ex. sessions Tinker) : la ligne est colorée par **le surligneur Shiki du deck** (même rendu que les blocs ` ```php `, thème sombre du deck puisque le fond du terminal est `#0f172a`) et le prompt `codePrompt` (`>>>`) remplace `prompt`. Le texte brut s'affiche d'abord, puis les couleurs arrivent sans saut de mise en page ; si le surligneur est indisponible, le texte reste clair.

```md
<Terminal
  title="tinker" prompt=">" :legend="true"
  :lines="[
    { lang: 'php', cmd: 'Category::create([\'name\' => \'Quiz\'])' },
    { lang: 'php', cmd: '$quest->category->name', out: '   = &quot;Quiz&quot;' }
  ]"
/>
```

**Quand** : toute commande + sortie **statique**. Réserver ` ```shell {monaco} ` aux cas où l'apprenant doit éditer/exécuter.

**Variantes par OS** : garder **un seul `<Terminal>`** quand la commande est identique partout — noter la différence d'environnement en une ligne (ex. `<Alert>` « Sous Windows : exécutez dans un terminal WSL2 »). N'utiliser `::code-group` (`comark: true`) que si les commandes diffèrent réellement selon l'OS.

### `<FileTree>` — arborescence

```md
<FileTree :tree="[
  { name: 'src', children: [
    { name: 'App.tsx', highlight: true },
    { name: 'main.tsx' }
  ]},
  { name: 'package.json', comment: 'Dépendances et scripts' }
]" />
```

`children` → dossier ; `highlight: true` → fichier mis en avant (1-2 max) ; `comment` → courte note en italique alignée à droite de la ligne. **Quand** : structure d'un projet généré ou attendu. Interdit : arborescence en ASCII dans un bloc de code.

### `<Browser>` — rendu d'application

```md
<Browser url="localhost:5173" title="Mon app">
  <Placeholder :w="800" :h="500" text="Page d'accueil" />
</Browser>
```

Props : `url` (`localhost:5173`), `title`. Slot = image, placeholder ou HTML. **Quand** : montrer le résultat visuel d'un code ; souvent en colonne droite d'un `two-cols-header`.

### `<ImageGrid>` — grille de logos ou captures

```md
<ImageGrid :cols="4" size="sm" :clicks="true" :images="[
  { src: 'https://placeholdit.com/200x200/00b5ff/f1f5f9?text=React', caption: 'React' },
  { src: 'https://placeholdit.com/200x200/00a96e/f1f5f9?text=Vue', caption: 'Vue' }
]" />
```

Props : `images` (requis, `{ src, alt?, caption? }`), `cols` (3), `size` : `sm` 80px / `md` 120px / `lg` 180px, `clicks`. **Quand** : écosystème d'outils, galerie de captures, comparaison visuelle. 4 à 8 images.

### `<Placeholder>` — image temporaire

```md
<Placeholder :w="600" :h="400" text="Schéma architecture" bg="1e293b" fg="94a3b8" />
```

Props : `w` (600), `h` (400), `text` (`w×h`), `bg` (`1e293b`), `fg` (`94a3b8`), `rounded` (true). Génère `https://placeholdit.com/…`. Presets dimensionnels : voir SKILL.md § Images et placeholders. Le `text` décrit **l'image attendue**.

---

## Chiffres et impact

### `<Stat>` — grand chiffre

```md
---
layout: fact
---

<div class="grid grid-cols-3 gap-8">
  <Stat value="42 k" label="téléchargements / semaine" color="blue" />
  <Stat value="0" label="fichier de config" color="green" />
</div>
```

Props : `value` (requis), `label`, `color` (`blue`). **Quand** : 1 à 3 chiffres sourcés (la source va dans les notes présentateur).

---

## Pratique et évaluation

### `<Exercise>` — bloc exercice

```md
<Exercise title="Rédiger une User Story" duration="10 min" level="autonome"
  :criteria="['Format qui/quoi/pourquoi', 'Respecte INVEST', '2 critères d\'acceptation']"
  :hints="['Commencez par le persona', 'Le « afin de » exprime un bénéfice', 'Relisez l\'exemple de la slide précédente']">

**Contexte** : application de réservation de restaurant.

**Consigne** : les clients doivent pouvoir annuler leur réservation.

</Exercise>
```

| Prop       | Type   | Défaut  | Rôle                                   |
| ---------- | ------ | ------- | -------------------------------------- |
| `title`    | String | —       | Requis                                 |
| `duration` | String | `''`    | Badge durée (`10 min`)                 |
| `level`    | String | `guidé` | `guidé` / `autonome`                   |
| `criteria` | Array  | `[]`    | Checklist « Critères de réussite »     |
| `hints`    | Array  | `[]`    | 3 indices gradués, repliés par défaut  |

**Quand** : toute slide d'exercice. Remplace les blocs `**Consignes**` / `**Critère de réussite**` / `**Durée estimée**` à la main. Le sujet doit différer des exemples de démonstration (skill `pedagogie`).

### `<Quiz>` — question à choix unique

```md
<Quiz question="Quel hook gère un état local ?" :options="['useEffect', 'useState', 'useRef', 'useMemo']" :answer="1" />
```

```md
<Quiz question="Que renvoie cette requête quand aucune quête n'est à la une ?" :options="['`null`', 'Une collection vide', '...', '...']" :answer="0">

```php
Quest::where('featured', true)->first();
```

</Quiz>
```

4 options, `answer` = index 0-based, 1 question par slide.

**Code dans un quiz** : tout code de plus d'un identifiant dans la question va dans un bloc de code (slot), jamais dans la prop `question`. Dans les options, le code s'écrit entre backticks (rendu `<code>`). Le bloc du slot est un fenced code block markdown classique — laisser des lignes vides autour.

**Quand (règle pédagogique)** : le quiz sert à **faire réfléchir AVANT d'introduire un concept** (pré-test / prédiction), jamais à vérifier ce qui vient d'être vu. Il se place **juste avant la slide qui explique la réponse**, et la slide suivante y revient (« Vous aviez deviné ? »).

- La question doit être **réfléchissable sans connaître le concept** : à partir du bon sens, d'une analogie ou d'un concept déjà vu au chapitre précédent
- Les mauvaises réponses sont des **intuitions plausibles** (celles que fait un débutant), pas des pièges absurdes
- La bonne réponse n'est jamais déjà écrite sur une slide précédente
- Exemples : « Une catégorie a plusieurs quêtes : où placer la clé étrangère ? » avant `belongsTo` / `hasMany` ; « Qu'est-ce qu'un framework ? » avant la définition
- ❌ Interdit : quiz en fin de chapitre qui redemande la définition, la syntaxe ou la commande qui vient d'être montrée

### `<Flashcard>` — carte recto/verso

```md
<div class="grid grid-cols-3 gap-4">
  <Flashcard front="Encapsulation" back="Cacher l'implémentation, exposer une interface" />
</div>
```

Props : `front`, `back` (requis). Clic → retournement. **Quand** : révision du lexique, 3 cartes par slide max.

---

## Référence

### `<Panorama>` — aide-mémoire d'un concept

```md
# Panorama : les routes

<script setup>
import routes from '/references/routes'
</script>

<Panorama :items="routes" doc="https://laravel.com/docs/12.x/routing" at="s2-ch1" />
```

| Prop    | Type   | Défaut | Rôle                                                        |
| ------- | ------ | ------ | ----------------------------------------------------------- |
| `items` | Array  | —      | Éléments à lister (requis, max 24)                          |
| `doc`   | String | —      | URL de la documentation officielle (requis)                 |
| `at`    | String | `''`   | Position courante `sN-chM` ; absent → aucun badge           |

Forme d'un élément : `{ name: string, desc: string, group?: string, seen?: string }`.

- `name` s'affiche en monospace (rendu texte : `{{ }}`, `@`, `<x-…>` passent tels quels), `desc` en petit texte estompé
- `group` : un titre en petites capitales est inséré avant le premier élément de chaque groupe (ordre conservé)
- `seen: 'sN-chM'` : l'élément est marqué « vu » (badge primaire) si `(s, ch)` ≤ `at` ; sinon il est estompé (~55 %). À renseigner uniquement quand l'élément est utilisé en livecoding/démo ou en Partie A de l'atelier (bonus, parties B et C exclus)
- Le pied affiche le compteur « N / total vus en séance » (si `at`) et le lien « Documentation officielle »

**Quand** : dernière slide de contenu d'un chapitre, juste avant « À vous » — aide-mémoire des éléments les plus utilisés, pas du contenu enseigné. Grille sur 3 colonnes, pas de scroll (export PDF complet). Sélection ≤ 24 éléments, `desc` ≤ 8 mots. Règles complètes : `SKILL.md`, « Slide Panorama — Format et Qualité ».

---

## Layout `chapter`

```md
---
layout: chapter
number: 3
duration: 30 min
background: https://placeholdit.com/1920x1080/0f172a/94a3b8?text=Chapitre   # optionnel
---

# Titre du chapitre

- Objectif 1
- Objectif 2
- Objectif 3
```

Props frontmatter : `number` (rang du chapitre **dans le deck** — repart à `01` pour chaque deck ; affiché « Chapitre 03 »), `duration`, `background` (image avec overlay sombre). **Quand** : première slide de chaque chapitre, à la place de `layout: cover` + `cover.sli.dev`. 2 à 4 objectifs formulés en verbes d'action.
