---
trigger: model_decision
description: When creating or editing the glossary slide (00-lexique.md) in any course
---

# Règles de Qualité — Slide de Lexique

## Format Obligatoire

```md
---
layout: two-cols-header
layoutClass: gap-x-6
---

# Lexique

::left::

<TermCard term="TermeA" translation="(Traduction)" definition="Définition concise en une ligne" />

<TermCard term="TermeB" definition="Définition concise en une ligne" />

::right::

<TermCard term="TermeC" translation="(Traduction)" definition="Définition concise en une ligne" />

<!--
Notes présentateur : termes centraux à souligner, ordre de présentation recommandé.
-->
```

**Positionnement** : immédiatement après la slide de ressources, avant le premier chapitre.

**Pas de `v-click`** : tous les termes doivent être visibles dès l'ouverture.

---

## Règles sur les Termes

### 1. Ordre alphabétique strict (par terme anglais)

Les termes sont triés alphabétiquement sur le `term` (qui est toujours l'anglais).
Chaque colonne est triée indépendamment, mais l'ensemble global doit rester alphabétique : la colonne gauche commence par les premières lettres, la droite continue.

```md
✅ Left:  Abstraction, Class, Constructor, Encapsulation
   Right: Inheritance, Instance, Interface, Method, Polymorphism

❌ Left:  Polymorphism, Abstraction, Method
   Right: Class, Inheritance
```

### 2. Terme en anglais, traduction uniquement si pertinente

- `term` = toujours le terme **anglais** (terme de référence technique)
- `translation` = uniquement si la traduction française **apporte de la clarté** et est **différente** du terme anglais
- Ne pas mettre de traduction si le terme est identique ou quasi-identique en français

```md
✅ <TermCard term="Inheritance" translation="(Héritage)" definition="..." />
✅ <TermCard term="Abstraction" definition="..." />          ← même mot, pas de traduction
✅ <TermCard term="Instance" translation="(Objet)" definition="..." />   ← synonyme utile

❌ <TermCard term="Container" translation="(Conteneur)" definition="..." />  ← évident, inutile
❌ <TermCard term="Module" translation="(Module)" definition="..." />         ← identique
```

### 3. Définition : une ligne, centrée sur le rôle dans le cours

- **Maximum 1 ligne** (10-15 mots maximum)
- La définition doit répondre à : *"Qu'est-ce que c'est dans le contexte de ce cours ?"*
- Pas de répétition du terme dans la définition
- Pas de définition encyclopédique ou multi-cas

```md
✅ "Mécanisme permettant à une classe de réutiliser une autre classe"
✅ "Contrat définissant des méthodes à implémenter"

❌ "L'héritage est un mécanisme de la POO qui permet à une classe fille d'hériter des attributs et méthodes d'une classe mère, favorisant ainsi la réutilisation du code" → trop long
❌ "Voir chapitre 3" → inutile
```

### 4. Sélection des termes : pertinence au cours, pas exhaustivité

Inclure **uniquement** les termes :
- Utilisés dans les slides du cours
- Potentiellement inconnus d'un apprenant débutant/reconversion
- Techniques et spécifiques au domaine enseigné

**Éviter** :
- Les termes trop génériques connus de tous (`function`, `variable`, `loop`)
- Les termes abordés dans d'autres cours sans lien avec celui-ci
- Les acronymes non utilisés dans le cours

```md
❌ Terme "Loop" dans un cours React → trop basique
❌ Terme "DDD" dans un cours Docker → hors-sujet
✅ Terme "Volume" dans un cours Docker → spécifique et essentiel
```

### 5. Équilibre des colonnes

- Les deux colonnes doivent avoir un **nombre similaire de TermCard** (±1 terme d'écart)
- Si le nombre total de termes dépasse 14-16, utiliser un scroll :

```md
::left::

<div class="h-[420px] overflow-y-auto pr-2">

<TermCard ... />
...

</div>
```

- Nombre idéal : **6 à 12 termes** au total (3-6 par colonne)
- En dessous de 6 : le lexique est insuffisant
- Au-delà de 16 sans scroll : le contenu déborde visuellement

---

## Anti-patterns Fréquents (INTERDIT)

### Traduction inutile ou redondante
```md
❌ <TermCard term="Module" translation="(Module)" definition="..." />
   → La traduction est identique au terme, elle n'apporte rien

❌ <TermCard term="Container" translation="(Conteneur)" definition="..." />
   → Évident pour tout francophone, ne mérite pas d'être traduit
```

### Définition trop longue
```md
❌ <TermCard term="Singleton" definition="Pattern de conception qui garantit qu'une classe ne peut être instanciée qu'une seule fois et fournit un point d'accès global à cette instance unique" />
✅ <TermCard term="Singleton" definition="Pattern garantissant une instance unique d'une classe" />
```

### Termes hors-sujet ou trop avancés pour le cours
```md
❌ Inclure "Monad" ou "Functor" dans un cours d'introduction à la POO
❌ Inclure "CQRS" dans un cours sur les User Stories
```

### Terme répété dans sa propre définition
```md
❌ <TermCard term="Factory" definition="Une Factory est un pattern qui crée des objets" />
✅ <TermCard term="Factory" definition="Pattern déléguant la création d'objets à une sous-classe" />
```

### Colonnes déséquilibrées
```md
❌ Left: 8 termes  /  Right: 2 termes
✅ Left: 5 termes  /  Right: 5 termes
```

---

## Checklist avant de valider une slide de lexique

- [ ] Termes triés alphabétiquement (par terme anglais)
- [ ] `translation` présente uniquement si la traduction apporte de la clarté et est différente du terme
- [ ] Chaque définition tient en une ligne (max 15 mots)
- [ ] Tous les termes sont utilisés dans le cours
- [ ] Aucun terme trop basique ou hors-sujet
- [ ] Colonnes équilibrées (±1 terme)
- [ ] Scroll activé si plus de 14 termes au total
- [ ] Notes présentateur indiquant les termes centraux à souligner
