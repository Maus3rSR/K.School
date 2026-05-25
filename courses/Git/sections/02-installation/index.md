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

