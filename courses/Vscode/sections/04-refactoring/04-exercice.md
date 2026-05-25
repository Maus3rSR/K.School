---
layout: two-cols-header
---

# Refactoring Intelligent

💡 Exercice : Refactoriser un fichier

::left::

<div v-click>

## 🎯 Objectif

Améliorer un fichier "sale" en utilisant uniquement les raccourcis

</div>

<div v-click class="mt-4">

## 📋 Instructions

1. Renommer `x` en `totalPrice` avec <Shortcut size="sm">F2</Shortcut>
2. Renommer `y` en `taxAmount` avec <Shortcut size="sm">F2</Shortcut>
3. Extraire le calcul de taxe en fonction avec <Shortcut size="sm">Ctrl + Shift + R</Shortcut>
4. Corriger l'import manquant avec <Shortcut size="sm">Ctrl + .</Shortcut>
5. Formater le fichier avec <Shortcut size="sm">Shift + Alt + F</Shortcut>

</div>

::right::

<Alert v-click type="success">

### Critères de réussite

- [ ] &nbsp; Variables nommées explicitement
- [ ] &nbsp; Fonction `calculateTax` extraite
- [ ] &nbsp; Aucune erreur

</Alert>

<!--
Instructions pour le formateur :
- Préparer un fichier avec des variables mal nommées (x, y, temp, data)
- Ajouter un import manquant volontairement
- Laisser le code mal formaté
- Chronométrer l'exercice (objectif : moins de 2 minutes)
- Faire une correction collective en montrant chaque étape
-->

