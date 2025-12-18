---
layout: cover
background: https://cover.sli.dev?1
highlighter: shiki
monaco: true
titleTemplate: "%s - Kevin UNFRICHT"
---

# Versionner son code avec

<img src="/git-logo.svg" />

<small>(Support de cours en work in progress 😅)</small>

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
        <img class="w-80 mb-2" src="/git_issue_1.png" />
        Gérer les versions de ses fichiers sans système de versionnage
    </div>
    <div v-click>
        <img class="w-80 mb-2" src="/git_issue_2.jpg" />
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
layout: cover
background: https://cover.sli.dev?3
---

# Chapitre 02 - Installation de GIT

---

# Installation
Chapitre 02 - Installation de GIT

https://git-scm.com/install/

Suivez les instructions

---

# Configuration
Chapitre 02 - Installation de GIT

Configuration Nom et Email pour votre identité
```shell {monaco}
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Préférence pour les fins de ligne

<div class="grid grid-cols-2 gap-4">
    <div>
        <small>Pour les utilisateurs Unix/Mac</small>
```shell {monaco}
git config --global core.autocrlf input
git config --global core.safecrlf true
```
    </div>
    <div>
        <small>Pour les utilisateurs Windows</small>
```shell {monaco}
git config --global core.autocrlf true
git config --global core.safecrlf true
```
    </div>
</div>

<!--
Les fins de ligne indiquent où une ligne de texte se termine.
Selon le système, elles sont encodées avec LF (Unix/macOS) ou CRLF (Windows).

Le but de cette config est de permettre de normaliser les fin de lignes pour éviter d'avoir un mélange inutile.
-->

---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Confirmer des changements

---

# Préalable
Chapitre 03 - Confirmer des changements

Crééz un nouveau dossier de travail, ouvrez un terminal dans ce dossier puis initialisez votre premier dépôt git 
```shell {monaco}
git init
```

TODO:
* Warning: Ne pas créer de dépôt dans un dossier, dont un dossier parent est déjà initialisé avec un dépôt Git
* Explication du `.git` folder

---

# Cycle de vie
Chapitre 03 - Confirmer des changements

<img src="/lifecycle.png" />

---

# Vérifier le statut de son espace de travail
Chapitre 03 - Confirmer des changements

```shell {monaco}
git status
```

Vous devriez voir
```shell {monaco}
git status
On branch main
nothing to commit, working tree clean
```

---

TODO:
* Expliquez `git add` sur les fichiers que l'on peut modifier
* Expliquez que nous trackons des modifications, et non pas des fichiers uniquement (exemple avec une modification sur un seul fichier dont une partie est staged et une partie unmodified)
* `git hist` et `git log --graph`
* `git diff` pour voir les différences
* `git diff --staged` pour voir les différences des fichiers staged
* `git commit --amend` pour modifier le dernier commit

---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Revenir en arrière

TODO:
* Naviguer dans l'historique avec `git checkout`
* `git restore` pour les modifications unstaged
* `git restore --staged` pour les modifications staged ou `git rm --cached` pour les fichiers non trackés staged
* `git revert` pour annuler un commit (+ parler du pointeur HEAD)
* `git reset` pour supprimer un commit

---
layout: cover
background: https://cover.sli.dev?6
---

# Chapitre 05 - Travail collaboratif

TODO:
* Créer un dépôt distant avec `git init --bare`
* Configurer le dépôt distant avec `git remote add <nom> <chemin>`
* `git push` et `git pull` (+ `--set-upstream`)
* `git clone` 
* `git fetch`
* Initialiser un dépôt GitHub
* Configuration d'une clé SSH

---
layout: cover
background: https://cover.sli.dev?7
---

# Chapitre 06 - Gestion des conflits

TODO:
* Explication des conflits de fusion
* Résolution manuelle des conflits

---
layout: cover
background: https://cover.sli.dev?8
---

# Chapitre 07 - Être branché 😎

TODO:
* Explication du concept de branche
* `git branch` pour créer, lister et supprimer des branches
* `git switch -c <branche>` (ou `git checkout -b <branche>` ou `git branch <branche> && git checkout <branche>`) pour basculer entre les branches
* `git merge` pour fusionner les branches
* `git rebase`

---
layout: center
---

# Ressources Utiles
<br/>

[Documentation](https://git-scm.com/book/fr/v2)

[Tutoriel](https://gitimmersion.com/)

[Cheat Sheet](https://git-scm.com/cheat-sheet)

[Le jeu "Oh my GIT"](https://ohmygit.org/)