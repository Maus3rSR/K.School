---
layout: chapter
number: 4
duration: 25 min
transition: slide-left | slide-right
---

# Pratique

- Créer une page Nimbus complète
- Valider votre compréhension
- Tester votre code en direct

<!--
Layout `chapter` de l'addon — ouverture du chapitre 4.
-->

---
transition: slide-up | slide-down
---

# À vous de jouer

<Exercise
  title="Votre première page Nimbus"
  duration="15 min"
  level="autonome"
  :criteria="[
    'La route /profil répond en local',
    'La vue affiche votre nom depuis un ref',
    'Un clic sur le titre inverse le texte'
  ]"
  :hints="[
    'Reprenez la structure du composant « compteur » vu au chapitre 3',
    'Créez le fichier src/routes/profil.nb.ts — Nimbus découvre la route automatiquement',
    'Pour inverser : nom.value.split(\'\').reverse().join(\'\')'
  ]"
>

Créez une page `/profil` qui affiche votre nom et le **reverse** (à l'envers) quand vous cliquez sur le titre. Lancez `nimbus dev` et vérifiez dans votre navigateur.

</Exercise>

<!--
Démontre `<Exercise>` : header avec badges level/duration, slot pour les consignes, critères en checklist, indices en <details> repliés (max 3). À utiliser pour toute activité pratique.
-->

---
transition: slide-up | slide-down
---

# Un point d'étape

<Quiz
  question="Dans Nimbus, quel fichier enregistre automatiquement la route d'une page ?"
  :options="[
    'nimbus.config.ts',
    'Un fichier dans src/routes/',
    'app.nb.ts obligatoirement',
    'Un import dans package.json'
  ]"
  :answer="1"
/>

<!--
Démontre `<Quiz>` (composant existant de l'addon) : 4 options, `answer` = index 0-based de la bonne réponse ; feedback vert/rouge au clic. À utiliser pour vérifier la compréhension en milieu de cours.
-->

---
transition: slide-up | slide-down
---

# Révisez en jouant

<div class="grid grid-cols-3 gap-4 mt-6">
  <Flashcard front="Que fait defineView ?" back="Déclare et enregistre une page Nimbus" />
  <Flashcard front="Que fait ref() ?" back="Crée une donnée réactive qui met à jour le template" />
  <Flashcard front="Où va la logique ?" back="Dans le contrôleur, jamais dans la vue" />
</div>

<div class="text-center mt-4 text-sm opacity-60">Cliquez sur une carte pour la retourner</div>

<!--
Démontre `<Flashcard>` (flip 3D au clic, front dos bleu primaire / back vert). À utiliser pour de la mémorisation active en fin de chapitre.
-->

---
layout: iframe-right
url: https://sli.dev
transition: slide-up | slide-down
---

# Explorez par vous-même

La documentation Slidev s'affiche à droite : c'est elle qui décrit tous les composants et layouts que vous venez de voir en action.

- Cherchez « addons » pour créer les vôtres
- Cherchez « animations » pour aller plus loin

<!--
Démontre le layout natif `iframe-right` (page web embarquée dans la slide). Si le site refuse l'embed en présentation exportée, remplacer l'URL par https://placeholdit.com/.
-->

---
transition: slide-up | slide-down
---

# Du code exécutable, ici même

```ts {monaco-run}
const frameworks = ['Nimbus', 'Stratus', 'Cirrus', 'Boreal']
const accueillants = frameworks.map(f => `${f} vous souhaite la bienvenue`)
console.log(accueillants)
```

<!--
Démontre `{monaco-run}` : le bloc s'exécute dans la slide (bouton Run) et affiche la console. À utiliser pour une démo live sans quitter la présentation.
-->
