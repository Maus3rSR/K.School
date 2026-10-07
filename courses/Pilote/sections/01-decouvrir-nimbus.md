---
layout: chapter
number: 1
duration: 20 min
transition: slide-left | slide-right
---

# Découvrir Nimbus

- Comprendre ce qu'est un framework web
- Identifier les forces de Nimbus
- Situer Nimbus dans l'écosystème

<!--
Démontre le layout `chapter` de l'addon (props number, duration, background optionnel). À utiliser en ouverture de chaque chapitre pour poser les objectifs.
-->

---
transition: slide-up | slide-down
---

# Deux façons de présenter une notion

<Definition term="Framework" translation="(Cadre de travail)">
Un ensemble de bibliothèques et de conventions qui structure votre code et vous évite de repartir de zéro à chaque projet.
</Definition>

<div class="mt-4">

<Analogy title="Comme une cuisine équipée" image="https://placeholdit.com/400x400/a855f7/f1f5f9?text=Cuisine">

Cuisiner chez soi, c'est possible avec trois casseroles et un couteau. Une cuisine équipée — plans de travail, four préchauffé, tiroirs rangés — ne cuisine pas à votre place : elle vous fait gagner du temps sur tout le reste.

Nimbus, c'est la cuisine équipée de votre application web.

</Analogy>

</div>

<!--
Démontre `<Definition>` (terme + définition, bordure primaire) et `<Analogy>` (titre, icône, image optionnelle à gauche ~35%). À utiliser pour introduire un concept abstrait par une comparaison concrète.
-->

---
transition: slide-up | slide-down
---

# Le vocabulaire du framework

Dans Nimbus, le mot-clé <Tag label="TypeScript">interface</Tag> décrit la forme de vos données, la fonction <Tag label="Nimbus">defineView</Tag> déclare une page, et la balise <Tag label="HTML">template</Tag> contient votre markup — le tout <span v-mark.circle.orange="1">sans configuration supplémentaire</span>.

<!--
Démontre `<Tag>` (label coloré au-dessus d'un mot, inline dans une phrase) et `v-mark.circle.orange` (surlignage manuscrit natif Slidev au click 1). À utiliser pour annoter du vocabulaire dans un texte courant.
-->

---
layout: statement
transition: slide-up | slide-down
---

# Nimbus ne remplace pas vos compétences : il les multiplie.

<!--
Démontre le layout natif `statement`. À utiliser pour une phrase d'impact, une idée forte à faire mémoriser.
-->

---
layout: fact
transition: slide-up | slide-down
---

# Nimbus en quelques chiffres

<div class="grid grid-cols-3 gap-8 mt-8">
  <Stat value="42 k" label="téléchargements / semaine" color="blue" />
  <Stat value="0" label="fichier de config requis" color="green" />
  <Stat value="98 %" label="de satisfaction développeur" color="purple" />
</div>

<!--
Démontre le layout natif `fact` + le composant `<Stat>` (grand chiffre + légende, palette sémantique). À utiliser pour des chiffres marquants (fictifs ici, Nimbus est imaginaire).
-->

---
layout: quote
transition: slide-up | slide-down
---

# Une conversion en un week-end

« J'ai réécrit mon side-project en Nimbus un week-end. Le lundi, je l'ai montré à mon équipe. Le vendredi, toute l'équipe était convertie. »

— Une développeuse imaginaire, tout à fait représentative de rien du tout

<!--
Démontre le layout natif `quote`. À utiliser pour un témoignage ou une citation qui humanise le propos.
-->

---
transition: slide-up | slide-down
---

# La règle d'or pour évaluer un framework

<KeyPoint variant="rule" title="Règle d'or" icon="📏">

Un framework ne se juge jamais sur sa page d'accueil. Vous l'évaluez sur **trois critères** : la clarté de ses conventions, la qualité de ses messages d'erreur, et la taille de sa communauté.

</KeyPoint>

<!--
Démontre `<KeyPoint>` variant `rule` (violet ; variants : tip/bleu, rule/violet, warning/orange). À utiliser pour fixer une règle ou un point clé en fin de notion.
-->
