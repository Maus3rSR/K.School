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

Faites un
```shell {monaco}
git --version
```

Si vous n'obtenez pas de numéro de version, vous pouvez faire l'installation depuis le site :

https://git-scm.com/install/

Suivez les instructions

---

# Configuration
Chapitre 02 - Installation de GIT

Configuration Nom et Email pour votre identité
```shell {monaco}
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Nom de la branche par défaut, historiquement c'est "master"
git config --global init.defaultBranch main

# Permet de lier la branche locale avec une branche distante
git config --global push.autoSetupRemote true
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

Nom de branche par défaut -> parenthèse historique (master vs main) : dans le passé, la branche par défaut était nommée "master", mais aujourd'hui il est préférable d'utiliser "main" pour des raisons d'inclusivité.

Cela permet d'avoir une convention plus inclusive et neutre en termes de genre, en évitant des termes potentiellement offensants dans le contexte de l'informatique.
-->

---
layout: cover
background: https://cover.sli.dev?4
---

# Chapitre 03 - Confirmer des changements

---

# Préalable
Chapitre 03 - Confirmer des changements

* Crééz un nouveau dossier de travail
* Ouvrez un terminal dans ce dossier
* Initialisez votre premier dépôt <span v-mark.red.underline class="font-black">local</span> git

<br/>

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

<span v-click>
Affichez le statut de votre dépôt
```shell {monaco}
git status
```
</span>

<span v-click>

Vous devriez voir
```shell {monaco}
git status
On branch main
nothing to commit, working tree clean
```

</span>

<span v-click>

Créez un premier fichier dans votre espace de travail et refaites la commande

```shell {monaco}
git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        hello.txt

nothing added to commit but untracked files present (use "git add" to track)
```

</span>

---

# Vérifier le statut de son espace de travail
Chapitre 03 - Confirmer des changements

<span v-click>

Indexez le fichier pour le suivre
```shell {monaco}
git add hello.txt
```

</span>

<span v-click>

Vérifiez le statut après l'indexation
```shell {monaco}
git status
```

</span>

<span v-click>

Vous devriez voir que le fichier est maintenant dans la zone d'indexation
```shell {monaco}
On branch main
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   hello.txt
```

</span>

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
* `git fetch` + argument `--prune` pour nettoyer les branches distantes supprimées
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
layout: cover
background: https://cover.sli.dev?9
---

# Chapitre 08 - Flux de travail

---

# Pourquoi choisir un flux de travail ?
Chapitre 08 - Flux de travail

Un flux de travail Git répond à des besoins concrets d’organisation, de qualité et de sécurité autour du code :

<div class="grid grid-cols-2 gap-4">

<span v-click>

Collaboration d’équipe

- Plusieurs développeurs travaillent en parallèle sur la même base de code, ce qui crée des risques de conflits, de régressions et de travail écrasé sans règles claires.
- Un workflow définit qui travaille où (feature branch, hotfix, etc.) et quand fusionner, ce qui réduit les conflits et garde une branche principale stable.

</span>

<span v-click>

Qualité du code et revue

- Les équipes veulent intégrer systématiquement des revues de code et des tests automatiques avant d’accepter une modification.
- Un flux de travail organise les pull/merge requests, les branches de fonctionnalité et leur passage par CI/CD, ce qui améliore la qualité et détecte jusqu’à une grande partie des bugs avant la prod.

</span>

</div>

---

# Pourquoi choisir un flux de travail ?
Chapitre 08 - Flux de travail

<div class="grid grid-cols-2 gap-4">

<span v-click>

Gestion des releases et des environnements

- Sur des projets avec versions, clients ou environnements multiples, il faut préparer une release pendant que d’autres développent déjà la suivante.
- Des workflows comme Git Flow ou GitLab Flow structurent les branches `release`, `hotfix`, `production`, `staging`, ce qui clarifie quelle branche correspond à quel environnement ou version.

</span>

<span v-click>

Traçabilité, rollback et stabilité

- Les équipes ont besoin d’identifier facilement quelles fonctionnalités ou corrections sont incluses dans une version précise.
- Un workflow avec branches et tags bien définis permet de revenir rapidement à un état stable (rollback), de gérer proprement les `hotfix` et d’automatiser les changelogs.

</span>

</div>

---

# Pourquoi choisir un flux de travail ?
Chapitre 08 - Flux de travail

<div class="grid grid-cols-2 gap-4">

<span v-click>

Adaptation à la taille et à la complexité

- Quand le projet ou l’équipe grossit, un simple “tout sur main” devient ingérable, et il faut un modèle qui supporte plus de contributions en parallèle.
- Choisir un workflow (GitHub Flow, Git Flow, trunk-based, etc.) permet d’adapter la structure à la fréquence de déploiement, au niveau des développeurs et à la complexité fonctionnelle du produit.

</span>

</div>

---

# Flux de travail: Main Only
Chapitre 08 - Flux de travail

<div class="grid grid-cols-2 gap-4">

<img src="/workflow_main_only.webp" />

<span class="text-sm" v-click>

**Pour :**
* Petites équipes avec collaboration minimale
* Projets avec cycle court et peu de complexité
* Prototypage

**Avantages :**
* Simplicité de compréhension
* Peu de branches, peu de conflits

**Inconvénients :**
* Suivi des développements individuels moins évident
* Risque d'instabilité sur des modifications directes
* Pas d'isolation pour des env de tests ou d'expérimentations

</span>

</div>

---

# Flux de travail: Feature Branching
Chapitre 08 - Flux de travail

<div class="grid grid-cols-2 gap-4">

<img src="/workflow_feature_branching.webp" />

<span class="text-sm" v-click>

**Pour :**
* Equipe travaillant sur plusieurs fonctionnalités à la fois
* Projets demandant un suivi des fonctionnalités et des tâches

**Avantages :**
* Isolation claire de chaque fonctionnalité
* Collaboration améliorée sur plusieurs fonctionnalités en parallèle
* Revenir en arrière est facile, en supprimant une branche, on supprime toute une fonctionnalité

**Inconvénients :**
* Conflits plus fréquents
* Demande de la discipline sur des fusions régulières et de mises à jour des branches

</span>

</div>

---

# Flux de travail: Gitflow
Chapitre 08 - Flux de travail

<div class="grid grid-cols-2 gap-4">

<img class="h-100" src="/workflow_gitflow.png" />

<span class="text-sm" v-click>

**Pour :**
* Equipes avec des cycles de déploiement bien définis
* Projets complexes et larges demandant stabilité
* Scénarios où les roles et responsabilités sont clairement définis

**Avantages :**
* Flux de travail clair pour le dev, testing et déploiement
* Efficace avec beaucoup de contributeurs
* Isolation pour la préparation au déploiement

**Inconvénients :**
* Complexe et demande rigueur d'application des règles
* La gestion de beaucoup de branches peut être fastidieuse
* Pas idéal pour des cycles de déploiement courts

</span>

</div>

---

# Flux de travail: GitHub Flow
Chapitre 08 - Flux de travail

<div class="grid grid-cols-2 gap-4">

<img src="/workflow_github_flow.png" />

<span class="text-sm" v-click>

**Pour :**
* Petits projets avec cycle court de déploiement

**Avantages :**
* Facilité d'application
* Encourage de déployer petit et fréquemment
* Peu de risque de conflits

**Inconvénients :**
* Branches à vie courte : manque de structure pour gérer des développements à long terme

</span>

</div>

---

# Flux de travail: Trunk-based Development
Chapitre 08 - Flux de travail

<div class="grid grid-cols-2 gap-4">

<img src="/workflow_trunk_based_development.png" />

<span class="text-sm" v-click>

**Pour :**
* Scénarios avec une bonne pratique du testing et de la CI/CD
* Projets demandant une haute collaboration et des itérations fréquentes en déploiement

**Avantages :**
* Encourage un rythme de déploiement élevé
* Peu de branches, peu de conflits
* Pousse à la communication et au pair/mob programing

**Inconvénients :**
* Demande une grande discipline dans le suivi et la communication
* Risque de conflits/d'instabilité si les développeurs passent trop de temps sur une branche ou teste mal

</span>

</div>

---

# Flux de travail: Release Branching
Chapitre 08 - Flux de travail

<div class="grid grid-cols-2 gap-4">

<img class="h-100" src="/workflow_release_branching.png" />

<span class="text-sm" v-click>

**Pour :**
* Projets avec support long-terme (LTS)
* Scénarios où le maintient de version isolée est critique
* Projets demandant un historique clair des déploiements

**Avantages :**
* Historique clair de tous les déploiements
* Branche principale toujours stable et production-ready
* Support des correctifs sur une version spécifique

**Inconvénients :**
* Trop de branches de version peut devenir fastidieu à gérer
* Pas idéal pour les projets qui ont besoin de muter rapidement

</span>

</div>

---

# Critères pour choisir une stratégie
Chapitre 08 - Flux de travail

<span class="text-sm">

* **Taille de l'équipe** : Les petites équipes privilégieront des stratégies plus simples comme le développement basé uniquement sur la branche principale ou GitHub Flow, tandis que les grandes équipes tireront profit d'approches structurées telles que Gitflow. Pour plus de clarté, utilisez des conventions de nommage de branches cohérentes, comme `/feature/{{author}}/{{card-number}}/{{description}}` pour Gitflow ou `/{{author}}/{{short-description}}` pour GitHub Flow.

* **Complexité du projet** : Les projets complexes nécessitent souvent une organisation plus poussée, ce qui rend Gitflow ou le système de branches de version idéaux. Par exemple, Gitflow peut utiliser `/hotfix/{{issue-number}}` pour les correctifs critiques ou `/release/{{version}}` pour la préparation des versions.

* **Besoins de déploiement** : Le déploiement continu est optimal avec GitHub Flow ou le développement basé sur la branche principale. Les branches éphémères dans le développement basé sur la branche principale peuvent suivre des formats comme `/fix/{{bug-id}}` ou `/task/{{id}}` pour la traçabilité.

* **Tests et stabilité** : Si les tests et la stabilité sont essentiels, Gitflow ou le système de branches de publication offrent une meilleur isolation pour faire des contrôles.

* **Rythme de développement** : Les projets à évolution rapide tirent parti du développement basé sur le tronc ou de GitHub Flow, où des conventions de nommage de branches légères comme `/{{author}}/{{short-description}}` sont efficaces.

</span>

---

# Tableau récapitulatif
Chapitre 08 - Flux de travail

<div class="text-sm">

| Critère | Main only | Feature <br/>Branching | Gitflow | GitHub flow | Trunked Based <br/> Development | Release <br/>branching |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| Taille de l'équipe | 👤 | 👤👤 | 👤👤👤 | 👤 | 👤👤 | 👤👤👤|
| Taille du projet | 🏠 | 🏠🏠 | 🏠🏠🏠| 🏠| 🏠🏠 | 🏠🏠🏠 |
| Rapidité release | 🚀🚀🚀 | 🚀🚀| 🚀| 🚀🚀🚀 | 🚀🚀🚀 | 🚀
| Complexité | 🥵 | 🥵🥵| 🥵🥵🥵| 🥵 | 🥵 | 🥵🥵🥵
| Stabilité projet |➕ |➕➕ | ➕➕➕| ➕➕|➕ | ➕➕➕

</div>

<small>_Ce tableau est un résumé et non à prendre au pied de la lettre car chaque critère est influencé par un contexte bien précis d'objectifs à atteindre avec une stratégie_</small>

---
layout: cover
background: https://cover.sli.dev?10
---

# Chapitre 09 - Conventions & bonnes pratiques

---
layout: center
---

# Ressources Utiles
<br/>

[Documentation](https://git-scm.com/book/fr/v2)

[Tutoriel](https://gitimmersion.com/)

[Cheat Sheet](https://git-scm.com/cheat-sheet)

[Git by Bit](https://gitbybit.com/)

[Le jeu "Oh my GIT"](https://ohmygit.org/)