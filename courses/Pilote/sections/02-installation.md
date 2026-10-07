---
layout: chapter
number: 2
duration: 15 min
transition: slide-left | slide-right
---

# Installation

- Créer un projet Nimbus en une commande
- Comprendre l'arborescence générée
- Lancer le serveur de développement

<!--
Layout `chapter` de l'addon — ouverture du chapitre 2.
-->

---
transition: slide-up | slide-down
---

# Du terminal au premier rendu

<Terminal
  title="zsh — nimbus"
  :clicks="true"
  :lines="[
    { cmd: 'nimbus create mon-app' },
    { out: '✔ Projet créé dans ./mon-app\n✔ Dépendances installées (12 paquets)' },
    { cmd: 'cd mon-app && nimbus dev' },
    { out: '➜ Local:   http://localhost:4000\n➜ Réseau:  http://192.168.1.12:4000\n✔ Prêt en 87 ms' }
  ]"
/>

<!--
Démontre `<Terminal>` avec `clicks` : chaque entrée {cmd, out} apparaît à un v-click. À utiliser pour dérouler une session shell pas à pas, en commentant chaque commande.
-->

---
layout: two-cols-header
layoutClass: gap-x-4
transition: slide-up | slide-down
---

# Ce que `nimbus create` a généré pour vous

::left::

<FileTree :tree="[
  { name: 'mon-app', children: [
    { name: 'nimbus.config.ts' },
    { name: 'package.json' },
    { name: 'src', children: [
      { name: 'app.nb.ts', highlight: true },
      { name: 'routes', children: [
        { name: 'index.nb.ts' },
        { name: 'about.nb.ts' }
      ]},
      { name: 'views', children: [
        { name: 'Home.vue' }
      ]}
    ]}
  ]}
]" />

::right::

<Browser url="localhost:4000" title="Nimbus dev server">
  <Placeholder :w="800" :h="500" text="Nimbus App" bg="1e293b" fg="94a3b8" :rounded="false" />
</Browser>

<div class="mt-3 text-sm opacity-80">

Le fichier `app.nb.ts` est le **point d'entrée** de votre application : c'est lui qui monte le routeur et la première vue.

</div>

<!--
Démontre `<FileTree>` (arborescence récursive, prop `highlight`) à gauche et `<Browser>` (chrome navigateur + slot contenant un `<Placeholder>`) à droite. À utiliser pour relier structure de fichiers et rendu visuel.
-->

---
transition: slide-up | slide-down
---

# L'écosystème des frameworks (fictif)

<ImageGrid
  :cols="4"
  size="md"
  :clicks="true"
  :images="[
    { src: 'https://placeholdit.com/200x200/00b5ff/f1f5f9?text=Nimbus', caption: 'Nimbus — notre choix' },
    { src: 'https://placeholdit.com/200x200/00a96e/f1f5f9?text=Stratus', caption: 'Stratus — orienté API' },
    { src: 'https://placeholdit.com/200x200/ffbe00/1e293b?text=Cumulus', caption: 'Cumulus — statique' },
    { src: 'https://placeholdit.com/200x200/a855f7/f1f5f9?text=Cirrus', caption: 'Cirrus — micro-frontends' },
    { src: 'https://placeholdit.com/200x200/ff5861/f1f5f9?text=Altus', caption: 'Altus — enterprise' },
    { src: 'https://placeholdit.com/200x200/1e293b/94a3b8?text=Nebula', caption: 'Nebula — expérimental' },
    { src: 'https://placeholdit.com/200x200/94a3b8/1e293b?text=Zephyr', caption: 'Zephyr — ultra-léger' },
    { src: 'https://placeholdit.com/200x200/4f8ef7/f1f5f9?text=Boreal', caption: 'Boreal — SSR first' }
  ]"
/>

<!--
Démontre `<ImageGrid>` (grille de cartes image + caption, cols/size, clicks pour révéler chaque carte). À utiliser pour un panorama visuel ; toutes les images sont des placeholders placeholdit.
-->

---
layout: image-right
image: https://placeholdit.com/800x1200/1e293b/94a3b8?text=Nimbus+CLI
transition: slide-up | slide-down
---

# La CLI Nimbus en résumé

- `nimbus create` — scaffold d'un projet
- `nimbus dev` — serveur de développement à chaud
- `nimbus build` — build de production
- `nimbus doctor` — diagnostic de votre environnement

<!--
Démontre le layout natif `image-right` avec une image distante (placeholder). À utiliser pour associer une liste courte à un visuel.
-->
