# Exercices Framework (Laravel) — règles pour les agents

À lire avec `courses/Framework/programme.md` (« Format de séance »), `courses/Framework/AGENTS.md` et le skill `exercices`.

## Structure d'un README d'exercice

1. **Charge** : socle / attendu / bonus, estimations indicatives (rythme rapide ; un étudiant lent met 2 à 3 fois plus)
2. **Étape 0** : contrôle d'environnement (`sail up -d`, page d'accueil qui répond…)
3. **Partie A — Socle (en séance)** : micro-étapes dans l'ordre des chapitres, chacune avec « Chapitre N » et une action vérifiable ; un **point de contrôle** par groupe d'étapes, avec son palier de rattrapage (tag Campus Quest du chapitre)
4. **Partie B — Attendu (à la maison, ≈ 1h15)** : **2 user stories** qui réappliquent la notion ailleurs dans WishFlix
5. **Partie C — Sous le capot (à la maison, ≈ 45 min)** : questions qui font lire le code du framework, réponses dans `REPONSES.md`. **Ne jamais la supprimer**
6. **Bonus** : la 3e user story et les défis

Budget à la maison : ≈ 2h par semaine (B + C).

## Règles

- Sujet WishFlix, jamais Campus Quest (le pacte « démo / transposition »).
- Rattrapage : renvoyer vers le tag Campus Quest du dépôt `CampusQuest`, jamais vers un tag de K.School ni vers une solution WishFlix.
- Pas de première installation lourde en séance ; une copie manuelle répétitive se remplace par un script fourni aux étudiants (ex. dans l'archive distribuée via Moodle) — les étudiants n'ont pas accès au dépôt K.School.
- Compatibilité avec le projet déjà commencé : ne pas changer le modèle de données (`programme.md`), ni les noms de fichiers, routes et vues attendus.

## Interface et maquettes

Applique le « Niveau d'aide selon le statut de la notion » du skill `exercices` :

- **Réutiliser les maquettes WishFlix** (`scenarios/WishFlix/src/`, distribuées aux étudiants en S2) : hero, `wish-section`, cartes `game-card`, filtres `wish-home__filters`, boutons des fiches et de la wishlist. La consigne nomme le bloc (fichier + classe) et n'ajoute que ce qui manque à une maquette statique (`<form>`, `name`, bouton d'envoi, `type="button"`)
- **HTML neuf seulement sans équivalent dans les maquettes** (formulaires du back-office, liste des catégories…) : fourni complet avec **DaisyUI**, Tailwind seulement pour ce que DaisyUI ne couvre pas (espacements, grilles, largeurs)
- **L'étudiant écrit le Blade et le PHP** (directives, `old()`, `@error`, `route()`, boucles), même répété sur plusieurs champs
- **Suggestions de factorisation** en **partials Blade** (`@include`), facultatives : `partials/game-card` (catalogue, mieux notés, wishlist), `partials/flash` (messages flash), `games/_form` (champs partagés par `create` et `edit`)

