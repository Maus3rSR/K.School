# Exercice 01 — Station spatiale

## Objectif

Refactorer un projet TypeScript en **screaming architecture** représentant une station spatiale, dont tous les noms internes sont volontairement opaques, afin de faire émerger le **langage ubiquitaire** du domaine.

## Contexte métier

Vous reprenez le code du système de gestion des ressources de la **station spatiale Kepler-7**.

Le domaine fonctionne ainsi :

- La station stocke trois types de **ressources** : carburant, nourriture, équipement
- Chaque ressource a une **quantité disponible** et des propriétés spécifiques à son type
- Un **conteneur** ne peut stocker qu'un seul type de ressource
- La station peut interroger ses conteneurs pour détecter les **stocks critiques** (sous un seuil)
- Certaines ressources sont **périmées** (nourriture dont la date d'expiration est passée)
- Le carburant a un **type de propulsion** : `hydrogen`, `plasma` ou `antimatter`

### Vocabulaire métier à utiliser

| Concept | Terme attendu |
|---------|--------------|
| Ressource de carburant | `Carburant` |
| Ressource de nourriture | `Nourriture` |
| Ressource d'équipement | `Equipement` |
| Boîte de stockage typée | `Conteneur` |
| Gestionnaire de la station | `StationSpatiale` |
| Vérifier si périmé | `estPerimee` |
| Ajouter une ressource | `approvisionner` |
| Retirer du carburant | `consommerCarburant` |
| Retirer de la nourriture | `consommerNourriture` |
| Retirer un équipement | `retirerEquipement` |
| Lister les stocks sous un seuil | `stocksCritiques` |
| Lister la nourriture périmée | `nourriturePerimee` |
| Quantité totale en station | `quantiteTotale` |

## Structure du projet

```
src/
├── carburant/
│   └── obj.ts          # ← interface Obj { id, label, quantity, propulsionType, rating }
├── nourriture/
│   └── obj.ts          # ← interface Obj { id, label, quantity, calories, expirationDate } + chk()
├── equipement/
│   └── obj.ts          # ← interface Obj { id, label, quantity, category, status }
├── stockage/
│   └── box.ts          # ← classe Box<T> générique : add / remove / getAll / count
├── station/
│   └── mgr.ts          # ← classe Mgr : registryA/B/C, insert, deleteA/B/C, findBelowThreshold, filterExpired, sumAll
└── main.ts             # ← point d'entrée (démo)
```

## Prérequis

- [Deno](https://deno.land/) installé (`deno --version`)
- Avoir fait l'exercice 01 (refactoring de nommage)

## Instructions

### Passe 1 — Renommer

Renommez tous les identifiants pour qu'ils reflètent le vocabulaire métier du domaine.

1. Dans `carburant/obj.ts` : renommer `Obj` et ses propriétés (`label`, `propulsionType`, `rating`…)
2. Dans `nourriture/obj.ts` : renommer `Obj`, ses propriétés, et la fonction `chk`
3. Dans `equipement/obj.ts` : renommer `Obj` et ses propriétés (`category`, `status`…)
4. Dans `stockage/box.ts` : renommer `Box`, ses méthodes (`add`, `remove`, `getAll`, `count`) et le champ `items`
5. Dans `station/mgr.ts` : renommer `Mgr`, ses registres (`registryA/B/C`) et toutes ses méthodes

### Passe 2 — Regrouper

Identifiez les concepts métier qui méritent d'être isolés.

6. Dans `nourriture/obj.ts` : la fonction `chk` est une règle métier — lui donner un nom qui exprime la règle
7. Dans `station/mgr.ts` : les trois `deleteA/B/C` peuvent-ils être remplacés par une méthode plus expressive ?

### Passe 3 — Reformuler

Faites en sorte que le code se lise comme un scénario du domaine.

8. Dans `station/mgr.ts` : reformulez les méthodes pour qu'elles racontent les opérations de la station
9. Dans `main.ts` : vérifiez que la démo se lit comme un récit compréhensible par un expert métier

## Critères de réussite

- [ ] Tous les noms correspondent au vocabulaire métier du tableau ci-dessus
- [ ] Un expert métier (non-développeur) peut lire `mgr.ts` et comprendre ce que fait la station
- [ ] Aucun nom technique opaque restant : pas de `Obj`, `Mgr`, `Box`, `registryA/B/C`, `chk`, `deleteA/B/C`, `findBelowThreshold`, `filterExpired`, `sumAll`
- [ ] `deno task start` s'exécute sans erreur
- [ ] Les types TypeScript restent cohérents après renommage

## Temps estimé

45 à 60 minutes
