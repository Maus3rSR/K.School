# Plan de cours — Séance 6 : Cycle de vie et Hooks

Durée : 3h (180 min)

## Fil conducteur

Depuis la séance 5, les apprenants savent afficher des listes et des conditions, mais tout leur code s'exécute **pendant** le rendu. Cette séance répond à la question posée en teaser de S5 : que se passe-t-il **au moment où** un composant apparaît, se met à jour, ou disparaît ? Elle introduit `useEffect` et `useRef`, deux hooks indispensables à la séance 7 (appel d'API).

## Prérequis

- `useState` typé et re-rendu (S4)
- Rendu conditionnel et listes (S5)
- Notion de fonction et de tableau de dépendances (JS de base)

## Objectifs pédagogiques

À l'issue de la séance, l'apprenant sait :
- Expliquer les 3 phases du cycle de vie d'un composant (montage, mise à jour, démontage)
- Écrire un `useEffect` typé et contrôler son déclenchement via le tableau de dépendances
- Nettoyer un effet (cleanup) pour éviter fuites mémoire et bugs
- Utiliser `useRef<HTMLElement>` pour accéder directement au DOM

## Déroulé horaire

| Bloc | Durée | Contenu |
|------|-------|---------|
| Accroche & rappel S5 | 10 min | Reprendre le teaser : "on sait afficher, mais pas réagir au montage/démontage". Poser la question en direct : comment mettre le focus automatique sur un input au chargement ? |
| Cycle de vie (concept) | 20 min | Schéma montage → mise à jour → démontage. Analogie (ex. cycle de vie d'un composant = ouverture/rafraîchissement/fermeture d'une page). Pas encore de code. |
| `useEffect` — syntaxe et typage | 30 min | Signature `useEffect(() => {...}, [deps])`. Effet au montage (`[]`), effet à chaque rendu (pas de tableau), effet sur dépendance (`[valeur]`). Live coding : `document.title` mis à jour selon le state. |
| Pratique guidée #1 | 25 min | Exercice encadré : afficher un message "Bienvenue" pendant 2s au montage d'un composant avec `setTimeout` dans un `useEffect`. |
| Cleanup des effets | 25 min | Pourquoi nettoyer (interval qui continue après démontage, listener dupliqué). Fonction de retour du `useEffect`. Live coding : `setInterval` + `clearInterval` dans le cleanup. |
| `useRef` pour le DOM | 25 min | Différence `useRef` vs `useState` (pas de re-render). Typage `useRef<HTMLInputElement>(null)`. Cas d'usage : focus automatique, scroll, mesure d'élément. |
| Exercice pratique combiné | 25 min | Mini-projet : un compteur avec un `useEffect` (interval + cleanup) et un input qui reçoit le focus automatiquement via `useRef` au montage. |
| Pièges courants | 10 min | Tableau de dépendances incomplet → bug ou boucle infinie. Oublier le cleanup. Vouloir utiliser `useRef` pour déclencher un re-rendu (ne fonctionne pas). |
| Synthèse | 5 min | Récap des 3 usages du tableau de dépendances + schéma cycle de vie / hooks. |
| Teaser séance 7 | 5 min | "On sait maintenant déclencher du code au montage. Et si, au lieu d'un `setTimeout`, on allait chercher de vraies données sur Internet ?" → introduire `fetch`. |

## Exercices

1. **Pratique guidée** — message de bienvenue temporisé (`useEffect` + `setTimeout` + cleanup).
2. **Exercice combiné** — compteur avec interval nettoyé + input auto-focus (`useRef`).

## Points de vigilance (notes formateur)

- Le tableau de dépendances est la source n°1 de confusion : bien insister sur les 3 cas (`[]`, pas de tableau, `[dep]`) avant de coder.
- Montrer concrètement une fuite (interval qui continue en console) *avant* d'introduire le cleanup, pour justifier son utilité.
- Ne pas encore parler de `fetch`/API ici, même si la tentation est grande — c'est le teaser de la séance 7, garder l'effet de surprise.
- Rappeler que `useRef` ne provoque pas de re-render : bon contre-exemple avec `useState` pour bien marquer la différence.
