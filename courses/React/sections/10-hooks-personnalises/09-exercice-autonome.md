---
layout: two-cols-header
layoutClass: gap-x-4
---

# Exercice autonome — useOnlineStatus

Seul cette fois

::left::

Vous disposez de ces événements du navigateur :

```tsx
window.addEventListener('online', handler)
window.addEventListener('offline', handler)

// à ne pas oublier :
window.removeEventListener('online', handler)
window.removeEventListener('offline', handler)
```

`navigator.onLine` donne l'état de connexion au chargement.

::right::

**Consignes**

<v-click>

1. Créer un hook `useOnlineStatus(): boolean`
2. Initialiser le state avec `navigator.onLine`
3. Utiliser `useEffect` pour écouter `online` et `offline`
4. Ne pas oublier le **cleanup** (S6) pour retirer les écouteurs
5. Afficher "🟢 En ligne" ou "🔴 Hors ligne" dans un composant `ConnectionBadge`

</v-click>

::bottom::

<v-click>

**Critère de réussite**

- Désactiver le Wi-Fi (ou le mode avion) met à jour le badge sans recharger la page
- Aucune fuite mémoire : les écouteurs sont bien retirés au démontage

</v-click>

<!--
Exercice autonome de 20 minutes. Domaine nouveau (statut réseau) : ni toggle, ni localStorage, ni fetch — combine useState + useEffect + cleanup déjà vus en S6, dans un cas d'usage inédit.
Aide graduée : indice 1 "quel state initial, et avec quelle fonction native ?", indice 2 "quelle est la fonction retournée par l'Effet ?", indice 3 montrer le retrait symétrique des deux écouteurs dans le cleanup.
-->
