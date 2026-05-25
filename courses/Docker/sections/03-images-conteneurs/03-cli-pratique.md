# Images & Conteneurs
Docker CLI

docker <span class="text-orange">`<OBJECT>`</span> <span class="text-blue">`<COMMAND>`</span>

<div class="grid grid-cols-3">

  <span class="text-orange">image</span>
  
  <span class="text-blue">ls, pull, rm, prune</span>
  
  Gestion des images ([documentation](https://docs.docker.com/reference/cli/docker/image/))
</div>

<div class="grid grid-cols-3">

  <span class="text-orange">container</span>
  
  <span class="text-blue">ls, run, stop, rm, prune</span>
  
  Gestion des conteneurs ([documentation](https://docs.docker.com/reference/cli/docker/container/))
</div>

---

# Images & Conteneurs
Docker CLI - Pratique guidée

Liste des images sur votre machine
> docker <span class="text-orange">image</span> <span class="text-blue">ls</span>

Tirer l'image `alpine` depuis le Docker Hub
> docker <span class="text-orange">image</span> <span class="text-blue">pull</span> alpine

Démarrer un conteneur depuis l'image `alpine` et afficher `Hello World!`
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> alpine echo "Hello World!"

Démarrer un conteneur depuis l'image `alpine` et y attacher un shell interactif
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-i -t</span> alpine sh

```bash
echo "Hello World!"
ls -lah
exit
```

<!--
-t --tty : permet de lier les flux I/O du conteneur à un pseudo terminal
-i -> --interactive : Laisse le flux d'entrée STDIN ouvert et permet d'envoyer des saisies au conteneur à travers la saisie standard
-->
---

# Images & Conteneurs
Docker CLI - Pratique guidée

Démarrer un conteneur en arrière-plan avec un processus détaché
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-d</span> alpine sh -c 'while true; do echo "Hello World!"; sleep 1; done'

Regardons la liste des conteneurs actifs
> docker <span class="text-orange">container</span> <span class="text-blue">ls</span>

Regardons les logs du conteneur
> docker <span class="text-orange">container</span> <span class="text-blue">logs</span> <span class="text-red">-f</span> `<container_name>`

---

# Images & Conteneurs
Docker CLI - Pratique guidée

Arrêter un conteneur actif
> docker <span class="text-orange">container</span> <span class="text-blue">stop</span> `<container_name>`

Lister les conteneurs inactifs et supprimons un conteneur
> docker <span class="text-orange">container</span> <span class="text-blue">ls</span> <span class="text-red">-a</span>
>
> docker <span class="text-orange">container</span> <span class="text-blue">rm</span> `<container_name>`

Supprimons tous les conteneurs inactifs 🛑
> docker <span class="text-orange">container</span> <span class="text-blue">prune</span>

---

# Images & Conteneurs
Docker CLI - Pratique guidée

Lister les images et supprimer l'image `alpine`
> docker <span class="text-orange">image</span> <span class="text-blue">ls</span>
>
> docker <span class="text-orange">image</span> <span class="text-blue">rm</span> alpine

Supprimons toutes les images non utilisées par aucun conteneurs
> docker <span class="text-orange">image</span> <span class="text-blue">prune</span> <span class="text-red">-a</span>

---

# Images & Conteneurs
Docker CLI - Pratique guidée

Démarrer un conteneur nommé, avec un shell interactif
> docker <span class="text-orange">container</span> <span class="text-blue">run</span> <span class="text-red">-it</span> <span class="text-red">--name</span> nodejs-container alpine

Installons NodeJS
```bash
apk add --update nodejs
exit
```

Créer une nouvelle image depuis un container actif
> docker <span class="text-orange">container</span> <span class="text-blue">commit</span> nodejs-container <span class="text-green">my-nodejs</span>

Executer une commande sur un container actif
> docker <span class="text-orange">exec</span> <span class="text-red">-it</span> nodejs-container sh

---

# Images & Conteneurs
Docker CLI - Pratique guidée

* <span class="text-green">my-nodejs</span> est le nom de la nouvelle image. C'est généralement appelé un <span class="text-green">tag</span>
* Créer des tags permet de fournir des images avec **un nom mémorisable**
* Cependant, **il y a une structure pour le nom d'une image** :

`[HOST[:PORT]/]NAMESPACE/REPOSITORY[:TAG]`

> HOST (défaut: `docker.io`)
> 
> PORT (défaut: `5000`)
> 
> NAMESPACE/REPOSITORY (défaut: `library`)
> 
> TAG (défaut: `latest`)

<!--
HOST
Indique l'emplacement du registre où se trouve l'image. Si ce paramètre est omis, Docker utilise par défaut Docker Hub (docker.io).

PORT
Numéro de port facultatif pour le registre, si nécessaire (par exemple :5000).

NAMESPACE/REPOSITORY
L'espace de noms (facultatif) représente généralement un utilisateur ou une organisation. Le dépôt est obligatoire et identifie l'image. Si l'espace de noms est omis, Docker utilise par défaut « library », l'espace de noms réservé aux images officielles Docker.

TAG
Identifiant facultatif permettant de spécifier une version ou une variante particulière de l'image. Si aucune étiquette n'est fournie, Docker utilise par défaut la version la plus récente.
-->
