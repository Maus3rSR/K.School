---
layout: cover
background: https://cover.sli.dev?1
highlighter: shiki
monaco: true
titleTemplate: "%s - Kevin UNFRICHT"
---

# Versionner son code avec

<img src="./git-logo.svg" />

---
layout: cover
background: https://cover.sli.dev?2
---

# Chapitre 01 - Qu'est ce que GIT

---

# Problèmatiques
Chapitre 01 - Qu'est ce que GIT

<div class="grid grid-cols-2 gap-4">
    <div v-click>
        <img class="w-80 mb-2" src="./git_issue_1.png" />
        Gérer les versions de ses fichiers sans système de versionnage
    </div>
    <div v-click>
        <img class="w-80 mb-2" src="./git_issue_2.jpg" />
        L'exponentialité des interactions humaines
    </div>
</div>

<!--
À partir de ces documents, les besoins éprouvés peuvent être :
* Comprendre les versions
* Pouvoir revenir en arrière, avoir une "trace"
* Pouvoir avoir une collaboration simple
-->

---

# Bref résumé
Chapitre 01 - Qu'est ce que GIT

* Date d'avril 2005, créé par le créateur du noyau Linux Linus Torvalds et par Junio Hamano
* Sous licence libre GNU GPLv2
* Autres outils :
    * connus : CVS, SVN (Subversion)
    * moins connus : Mercurial, Bazaar

---

# Analogie
Chapitre 01 - Qu'est ce que GIT

<span class="text-sm">
Imagine un groupe d’auteurs qui écrivent ensemble un livre.​

Le roman complet correspond à la branche principale : c’est la version « officielle » de l’histoire.​

Chaque auteur travaille sur une copie de chapitre dans son propre carnet : ce sont les branches où l’on expérimente des idées sans casser la branche principale.​

Quand un auteur a terminé une modification, il confirme ses modifications avec la nouvelle version de son chapitre avec **la date** et **un résumé de ce qu’il a changé** : c’est un **commit** dans Git, c’est‑à‑dire un point de sauvegarde dans l’évolution du texte.​

Tous les carnets et versions successives sont rangés dans une bibliothèque commune où chaque nouvelle version est archivée au bon endroit : c’est le dépôt Git, qui conserve tout l’historique du projet.​
Lorsque les auteurs sont d’accord sur une amélioration, ils fusionnent leurs chapitres dans le roman principal.

S'il y a un conflit aux mêmes endroits de leurs carnets lors de la fusion, ils doivent décider de ce qu'il faut conserver dans le roman principal.

Si une erreur s’est glissée dans l’histoire, on peut rouvrir un ancien chapitre archivé et revenir à cette version, ou comparer deux versions pour voir exactement ce qui a changé, comme on le ferait avec les commits et les diffs dans Git.
</span>

---

# Confirmer les modifications
Chapitre 01 - Qu'est ce que GIT