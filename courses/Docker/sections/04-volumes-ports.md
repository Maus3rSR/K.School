---
layout: cover
background: https://cover.sli.dev?5
---

# Chapitre 04 - Volumes & Ports

---

# Volumes & Ports
&nbsp;

Par défaut, tous les fichiers créés dans le conteneur sont stockés sur une couche en écriture. Ce que cela veut dire :

* Les créations/modifications/suppressions de données d'un conteneur **n'affectent pas les autres conteneurs**
* Les données **ne persistent pas** sur une conteneur quand il est supprimé
* Comment persister les données dans ce cas ? Les **Volumes** !

---

# Volumes & Ports
Types de Volumes

<div class="grid grid-cols-2 gap-x-4"> 

<div>
Il existe deux options pour un conteneur afin de stocker les fichiers sur la machine hôte :

* **docker volumes** : gérés par Docker
* **bind mounts** : liés à un répertoire de l'hôte

Une troisième option existe et consiste à écrire directement les fichiers dans la RAM et non sur le disque. Cela se nomme **tmpfs** <small>_(temporary filesystem)_</small>
</div>

<img src="/docker_volume.png" />

</div>

---

# Volumes & Ports
Types de Volumes

<div class="grid grid-cols-2 gap-x-4"> 

* Les volumes docker **fonctionnent de la même manière** que les `bind mounts`
* Ils sont également écrits sur le système de fichier de la machine hôte
* Les données sont persistées, mais nous ne savons pas exactement où car c'est Docker qui s'en occupe pour nous

<img src="/docker_volume.png" />

</div>

---

# Volumes & Ports
Types de Volumes

<div class="grid grid-cols-2 gap-x-4"> 

* Les volumes sont pratiques pour **le partage de données** entre différents conteneurs

<img src="/docker_volume_shared.png" />

</div>

---

# Volumes & Ports
Pratique guidée

Démarrer un conteneur `alpine` et faire un montage du dossier hôte `/tmp` dans le dossier du conteneur `/opt/data`
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-it --volume</span> /tmp<span class="text-yellow font-black">:</span>/opt/data alpine

Regardez les permissions des fichiers dans `/opt/data`, que penses-vous des permissions ? 💣
```bash
ls -alrt /opt/data
```

<!--
Les permissions affichées dans /opt/data sont exactement celles du répertoire /tmp de l'hôte, pas celles « par défaut » du conteneur
Un bind mount casse partiellement l'isolation : le conteneur voit et peut modifier des fichiers de l'hôte avec les mêmes droits que l'UID/GID qui tourne dans le conteneur.
Si on lance un conteneur en root (comme dans l'exemple), root dans le conteneur = root sur l'hôte pour ce répertoire monté : il peut supprimer/modifier tout ce qu'il veut dans /tmp de l'hôte.
-->

---

# Volumes & Ports
Pratique guidée

Créez un volume nommé `outerspace`
> docker <span class="text-orange">volume</span> <span class="text-blue">create</span> outerspace

Montez ce volume dans le conteneur `alpine`. Notez ici que nous ne précisons pas où est situé ce volume sur le système de fichier hôte. Docker s'en occupe pour nous.
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-it --volume</span> outerspace<span class="text-yellow font-black">:</span>/opt/data alpine

On peut néanmoins, si besoin, localiser le volume
> docker <span class="text-orange">container</span> <span class="text-blue">inspect</span> `<container_name>`
> 
---

# Volumes & Ports
Port mapping

* Que vous vouliez **exposer** une **base de données**, un **serveur web** ou même une **API Rest**, vous devez toujours le faire démarrer sur **un port de votre machine**
* Docker **ne publie pas** les ports de votre application **automatiquement**. Vous devez lui dire depuis quel port de votre machine locale rediriger le traffic vers quel port du conteneur. C'est ce qu'on appelle le **port-mapping**
* Par défaut, Docker utilise l'interface globale `0.0.0.0` pour exposer les ports. ⚠️ Ce qui est dangereux et **rend accessible votre application depuis tout le réseau**. On peut éviter cela en spécifiant **l'interface locale** `127.0.0.1` quand on publie des ports.

---

# Volumes & Ports
Port mapping

<img src="/docker_port_mapping.webp" />

---

# Volumes & Ports
Exposer un Service

Démarrez un nouveau conteneur qui fera tourner `nginx` et exposez son port 80 sur votre machine
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-d -p</span> 8080:80 nginx

Ouvrez votre navigateur à l'adresse http://127.0.0.1:8080
