# Exercice 01 — Refactoring de nommage

## Objectif

Refactorer un projet TypeScript en **screaming architecture** dont tous les noms internes sont volontairement opaques, afin de faire émerger le **langage ubiquitaire** du domaine.

## Contexte métier

Vous reprenez le code d'une **plateforme d'inscription à des formations professionnelles**.

Le domaine fonctionne ainsi :

- Un **candidat** s'inscrit à une **session de formation**
- Une session a une **capacité maximale** et une **date de début**
- L'inscription n'est possible que si :
  1. La session n'est **pas complète** (places disponibles)
  2. La session est **à venir** (date de début dans le futur)
  3. Le candidat n'est **pas déjà inscrit** à cette session
- Une inscription validée génère une **confirmation** avec un numéro de référence

### Vocabulaire métier à utiliser

| Concept | Terme attendu |
|---------|--------------|
| Personne qui s'inscrit | `Candidat` |
| Evènement de formation | `SessionDeFormation` |
| Acte d'inscription | `Inscription` |
| Résultat d'une inscription validée | `ConfirmationInscription` |
| Vérifier les conditions | `validerInscription` |
| Calculer les places restantes | `placesDisponibles` |
| Savoir si une session est ouverte | `estOuverte` |

## Structure du projet

```
src/
├── candidat/
│   └── obj.ts          # ← entité Candidat
├── formation/
│   └── data.ts         # ← entité SessionDeFormation
├── inscription/
│   ├── handler.ts      # ← logique d'inscription
│   └── result.ts       # ← résultat d'une inscription
├── validation/
│   └── checker.ts      # ← règles de validation
└── main.ts             # ← point d'entrée (démo)
```

## Prérequis

- [Deno](https://deno.land/) installé (`deno --version`)
- Avoir compris les 3 passes de refactoring (renommer → regrouper → reformuler)

## Instructions

### Passe 1 — Renommer

Renommez tous les identifiants opaques pour qu'ils reflètent le vocabulaire métier.

1. Dans `candidat/obj.ts` : renommer la classe et ses propriétés
2. Dans `formation/data.ts` : renommer la classe, ses propriétés et ses méthodes
3. Dans `inscription/result.ts` : renommer la classe et ses propriétés
4. Dans `validation/checker.ts` : renommer les fonctions et leurs paramètres
5. Dans `inscription/handler.ts` : renommer la fonction principale et ses variables internes

### Passe 2 — Regrouper

Identifiez les concepts métier qui méritent d'être isolés.

6. Extrayez la constante magique `0.8` (taux de réduction) vers une constante nommée, si applicable
7. Vérifiez que chaque fichier contient **un seul concept** du domaine

### Passe 3 — Reformuler

Faites en sorte que le code se lise comme une phrase du domaine.

8. Dans `inscription/handler.ts` : reformulez le corps de la fonction pour qu'il raconte l'histoire métier
9. Dans `validation/checker.ts` : reformulez les conditions pour qu'elles expriment des règles métier

## Critères de réussite

- [ ] Tous les noms correspondent au vocabulaire métier du tableau ci-dessus
- [ ] Un expert métier peut lire `handler.ts` et comprendre ce qui se passe
- [ ] Aucun nom générique restant : pas de `data`, `obj`, `tmp`, `res`, `check`, `handle`, `process`
- [ ] `deno task start` s'exécute sans erreur
- [ ] Les types TypeScript restent cohérents après renommage

## Temps estimé

45 à 60 minutes
