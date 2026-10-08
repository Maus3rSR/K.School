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

Pas de props : le slot par défaut est le terme (fond primaire discret, inline, sans label).

**Quand** : première occurrence significative d'un terme présent dans le lexique, ou mot-clé susceptible de tomber en QCM. **≤ 3 par slide**, uniquement dans du texte courant (prose, items de liste, `<KeyPoint>`) — jamais dans les titres, le code, les tableaux ni les props. Différence avec `<Tag>` : `Tag` annote l'origine techno d'un mot (label au-dessus), `KeyTerm` marque un terme à retenir (surlignage inline).

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

Props : `lines` (requis, `{ cmd?, out? }`), `title` (`bash`), `prompt` (`$`), `clicks`. Le `out` conserve les retours à la ligne (`\n`). Les caractères `<`, `>` et `|` peuvent être écrits tels quels dans `cmd`/`out` — pas besoin de séquences d'échappement.

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

4 options, `answer` = index 0-based. **Quand** : fin de chapitre, 1 question par slide.

### `<Flashcard>` — carte recto/verso

```md
<div class="grid grid-cols-3 gap-4">
  <Flashcard front="Encapsulation" back="Cacher l'implémentation, exposer une interface" />
</div>
```

Props : `front`, `back` (requis). Clic → retournement. **Quand** : révision du lexique, 3 cartes par slide max.

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
