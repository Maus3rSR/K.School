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

