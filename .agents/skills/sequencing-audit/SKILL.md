---
name: sequencing-audit
description: Audit de l'enchaînement des notions d'un cours K.School (aucune notion utilisée avant d'être introduite, ordre slides / démo / exercice, renvois, cohérence avec la solution, budget). Invoquer à la fin de toute création ou modification sous courses/, exercices/ ou scenarios/, et quand on demande de vérifier ou critiquer une séance.
---

# Audit de séquencement

Vérifie qu'un apprenant qui suit le cours **dans l'ordre** ne rencontre jamais une notion, un code ou une consigne qui dépend de quelque chose qu'il n'a pas encore vu.

L'audit a deux niveaux :

- **Niveau 1 — universel** : s'applique à tout cours, quel que soit son format, sa durée ou son public.
- **Niveau 2 — piloté par le profil** : s'applique uniquement si le cours déclare un **profil pédagogique** (voir « Format du profil »). Sans profil, le niveau 2 n'est **pas** exécuté : l'audit ne suppose jamais un format (cycles, démo, fil rouge, budget) que le cours ne déclare pas.

## 1. Périmètre

- **Par défaut** : les séances touchées par la tâche en cours (fichiers modifiés dans la tâche, `git status`, `git diff --name-only`). Une modification d'un fichier partagé (lexique, `references/`, solution) étend le périmètre aux séances qui l'utilisent.
- **À la demande** : la séance ou le cours désigné par l'utilisateur.
- **Jamais** de balayage de tout le dépôt sans demande explicite : les cours non modifiés ne sont pas audités.

Une séance = un deck `courses/<Cours>/slides*.md` et les fichiers qu'il inclut (`src:`), dans l'ordre d'inclusion, plus les artefacts que le profil lui associe (démo, exercice, solution).

## 2. Lire le contexte

1. `courses/<Cours>/programme.md` → section « Profil pédagogique » (souvent dans « Format de séance »).
2. `courses/<Cours>/AGENTS.md` et `exercices/<cours>/AGENTS.md` s'ils existent : règles propres au cours.
3. **Acquis antérieurs** : prérequis du public (profil ou programme), résumé des séances précédentes du `programme.md`, et en cas de doute une recherche (`grep -rn`) dans les decks des séances précédentes. Une notion vue dans une séance antérieure compte comme introduite.

Profil absent ou incomplet → noter « niveau 2 non vérifié » (ou la liste des clés manquantes) dans le rapport, puis continuer avec le niveau 1.

## 3. Inventaire des notions

Lire la séance **dans l'ordre de présentation** et dresser, par chapitre :

| Chapitre | Introduit (expliqué) | Utilisé sans être expliqué ici |
|---|---|---|

- Une notion est **introduite** quand une slide (contenu visible) l'explique ; une simple apparition dans un bloc de code ou dans les notes du présentateur est un **usage**.
- Une notion **fournie** par la consigne (code exact donné dans le README ou la slide « À vous », sans explication) reste un usage non introduit. Gravité : *mineur* si l'apprenant peut la transposer d'une notion déjà vue (ex. `@checked` après `@selected`), *bloquant* sinon.
- Compter aussi les constructions de code (fonction, directive, option, attribut HTML, commande) : un `@checked` dans un exemple est un usage de `@checked`.
- Faire l'inventaire de **chaque artefact** de la séance (slides, démo, exercice, annexe, solution) avec ses positions `fichier:ligne`.

Cet inventaire est la base de tous les contrôles ; il n'est pas recopié en entier dans le rapport.

## 4. Niveau 1 — contrôles universels

| Id | Contrôle |
|---|---|
| U1 | **Aucun usage avant introduction** : chaque notion utilisée (slides, exercice, démo) est introduite avant, dans cette séance ou une précédente, ou fait partie des prérequis déclarés. |
| U2 | **Renvois valides** : « chapitre N », « séance N », « voir plus haut », chemins de fichiers, exercices et tags cités existent et désignent le bon contenu. Contrôle mécanique et exhaustif (voir ci-dessous). |
| U3 | **Termes définis** : les termes techniques centraux sont définis (lexique ou slide) au plus tard à leur premier usage. |
| U4 | **Cohérence interne** : un même code, une même route ou un même comportement montré à deux endroits est identique, ou la différence est annoncée (« on change… »). Une affirmation (« le comportement ne change pas ») est vraie au regard du code montré. |
| U5 | **Exercice lié** (s'il en existe un) : chaque étape ne dépend que de notions vues au moment où elle est faite ; ce que l'énoncé dit fournir est réellement fourni. |
| U6 | **Problème avant abstraction** : une abstraction présentée comme solution arrive après le problème qu'elle résout. Toujours classé *mineur*. |
| U7 | **Promesses tenues** : ce qu'annoncent le titre et les objectifs d'un chapitre (slide `chapter`) est effectivement enseigné dans le chapitre. Une notion promise jamais traitée est un défaut, même si rien ne l'utilise ensuite. Un chapitre explicitement marqué « TODO » / « en cours » est signalé une seule fois en *mineur*, pas notion par notion. |

**U2 en pratique** : lister tous les renvois sur tous les artefacts de la séance, puis vérifier chaque occurrence une par une (le chapitre cité enseigne-t-il bien ce qu'on lui attribue ?) :

```bash
grep -rniE 'chap(itre)?\.? ?[0-9]+|séance ?[0-9]+|\bS[0-9]+\b|ch[0-9]+|plus haut|précédent' <artefacts>
```

Les **notes du présentateur** sont auditées pour U2 et U4 (un renvoi ou une affirmation fausse trompe le formateur) ; leurs défauts sont *mineurs*.

## 5. Niveau 2 — contrôles du profil

N'exécuter que les contrôles dont la clé est renseignée dans le profil (valeur « aucun » = contrôle sauté).

| Id | Clé du profil | Contrôle |
|---|---|---|
| P1 | Ordre imposé | Les artefacts listés suivent le même ordre de chapitres ; chaque étape de démo ou d'exercice indique son chapitre ; aucun retour vers un chapitre clos, aucun saut vers un chapitre futur. |
| P2 | Démo, Exercice | Tout ce que la pratique en séance demande (champ, syntaxe, méthode, règle) est montré avant dans les slides ou la démo du chapitre correspondant — pas seulement dans une annexe, un bonus ou une séance future. |
| P3 | Solution de référence | Le code des slides et de la démo correspond à la solution (noms, routes, redirections, chargements, contraintes). La solution reflète l'état de fin de parcours (annexe ou bonus inclus si le profil ou la démo le dit) ; un écart annoncé dans la démo ou le README n'est pas un défaut. Signaler l'écart sans décider qui a raison. |
| P4 | Budget utile | Somme des `duration` des chapitres ≤ budget utile ; la charge annoncée par une slide d'exercice = celle du README ; une durée affichée tient dans le budget. |
| P5 | Densité | Nombre de notions nouvelles et d'« aperçus » dans la limite déclarée. Comptage : une **notion** = un concept qui a son propre cycle (chapitre ou sous-partie avec pratique) ; ses variantes (plusieurs règles de validation, plusieurs directives de la même famille) comptent pour une. Un **aperçu** = une notion montrée en séance sans pratique ; une annexe de lecture non présentée n'est ni l'un ni l'autre. Donner le décompte détaillé avec le verdict. |
| P6 | Rattrapage | Chaque point de contrôle de l'exercice cite son palier, et le palier couvre bien ce que l'étape demande. Un palier dans un dépôt externe non accessible : vérifier seulement la cohérence des renvois, et lister le reste en « Non vérifié ». |
| P7 | Fil rouge | Les règles déclarées entre sujet de démo et sujet de pratique sont respectées (ex. jamais de recopie). |
| P8 | Règles propres | Chaque règle vérifiable listée (ou référencée dans `AGENTS.md`) est contrôlée. Une règle propre ambiguë (cas qu'elle ne tranche pas) se signale en *suggestion* de clarification de l'`AGENTS.md`, pas en défaut. |

## 6. Rigueur des constats

- **Chaque constat cite ses preuves** : `fichier:ligne` de l'usage **et** `fichier:ligne` de l'introduction (ou « introduit nulle part dans la séance ni avant »).
- **Avant de conclure à une absence**, rechercher le terme (`grep -rn`) dans tous les artefacts de la séance et dans les séances précédentes.
- **Ne pas signaler comme défaut un choix déclaré** par le profil ou l'`AGENTS.md` du cours (ex. une démo flash qui ne retape pas le code).
- **Ne pas inventer de règle** : un contrôle sans base dans ce skill, le skill `pedagogie` ou le profil est au mieux une *suggestion*.
- **Gravité** :
  - *Bloquant* : un apprenant qui suit l'ordre est bloqué (consigne irréalisable avec ce qui a été vu) ou face à une contradiction.
  - *Mineur* : gêne, imprécision, renvoi faux sans blocage, dépassement de budget.
  - *Suggestion* : amélioration hors règle.

## 7. Pendant et après l'audit

- L'audit **ne modifie rien**.
- Audit lancé à la fin d'une tâche de l'agent : corriger les défauts **introduits par cette tâche**, puis relancer l'audit sur le même périmètre. Les défauts préexistants sont seulement signalés.
- Audit à la demande : rendre le rapport et attendre la décision de l'utilisateur avant toute correction.

## 8. Format du rapport

```markdown
## Audit de séquencement — <Cours> · <Séance>

**Profil** : présent / absent (niveau 1 seulement) / incomplet (clés manquantes : …)
**Périmètre** : <deck> + <artefacts>

### Bloquants
- [U1] `@checked` utilisé dans l'étape A3 (`exercices/…/README.md:42`), introduit nulle part avant (seulement en annexe `…/09-annexe.md:204`).

### Mineurs
- [U2] …

### Suggestions
- …

### Non vérifié
- Niveau 2 (profil absent) / P6 (tags non accessibles) / …
```

Section vide → écrire « Aucun ».

## Format du profil

Le profil se déclare dans `courses/<Cours>/programme.md`, en sous-section `### Profil pédagogique` de « Format de séance ». C'est un tableau clé / valeur ; une clé sans objet vaut « aucun » (le contrôle correspondant est sauté). La prose détaillée reste dans « Format de séance ».

```markdown
### Profil pédagogique

| Clé | Valeur |
|---|---|
| Public | débutants sur <sujet>, prérequis : … |
| Unité | séance de 4h / journée / module de 2h … |
| Budget utile | 180 min (somme des `duration`) / non contraint |
| Modèle de séance | cycles théorie → démo → pratique / magistral + TP final / atelier … |
| Decks | `courses/<Cours>/slides-*.md`, un par séance |
| Démo | `scenarios/<Demo>/<stack>/seance-XX/LIVECODING.md` / aucune |
| Solution de référence | `scenarios/<Demo>/<stack>/seance-XX/solution/` / aucune |
| Exercice | `exercices/<cours>/XX-*/README.md` (partie en séance : …) / aucun |
| Fil rouge | <projet> (règle : …) / aucun |
| Ordre imposé | slides = démo = partie en séance / slides seuls |
| Rattrapage | <palier par point de contrôle> / aucun |
| Densité | 3-4 notions nouvelles, ≤ 1 aperçu / non contrainte |
| Règles propres | renvoi vers `AGENTS.md` (sections …) / aucune |
```

Un cours ancien n'a pas besoin de profil tant qu'il n'est pas refondu ; écrire son profil est la **première étape** de sa refonte.
