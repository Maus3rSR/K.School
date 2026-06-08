# QCM Docker - 40 questions

**Barème : 20 points (0.5 point par question)**

---

### Questions Faciles

**1. Qu'est-ce que Docker ?**
- a) Un système d'exploitation
- b) Une plateforme de conteneurisation
- c) Un langage de programmation
- d) Un logiciel de virtualisation de matériel

_Réponse(s) : b)_ 

**2. Quelle est la principale différence entre un conteneur Docker et une machine virtuelle (VM) ?**
- a) Les conteneurs sont plus lourds que les VMs.
- b) Les conteneurs partagent le noyau de l'OS hôte, tandis que les VMs ont leur propre OS.
- c) Les VMs démarrent plus rapidement que les conteneurs.
- d) Il n'y a pas de différence majeure.

_Réponse(s) : b)_ 

**3. En quel langage Docker est-il principalement écrit ?**
- a) Python
- b) Java
- c) Go
- d) C++

_Réponse(s) : c)_ 

**4. Qu'est-ce qu'une image Docker ?**
- a) Une instance en cours d'exécution d'un conteneur.
- b) Un snapshot d'un conteneur à un instant T.
- c) Un template en lecture seule contenant les instructions pour créer un conteneur.
- d) Un fichier de configuration pour Docker Compose.

_Réponse(s) : c)_ 

**5. Qu'est-ce qu'un conteneur Docker ?**
- a) Une instance exécutable d'une image.
- b) Un répertoire sur la machine hôte.
- c) Un synonyme de machine virtuelle.
- d) Un fichier binaire.

_Réponse(s) : a)_ 

**6. Quelle(s) commande(s) permet de lister les conteneurs en cours d'exécution ?**
- a) `docker list containers`
- b) `docker ps`
- c) `docker container ls`
- d) `docker show containers`

_Réponse(s) : b, c)_ 

**7. Quelle commande permet de télécharger une image depuis Docker Hub ?**
- a) `docker get <image>`
- b) `docker pull <image>`
- c) `docker download <image>`
- d) `docker image fetch <image>`

_Réponse(s) : b)_ 

**8. Qu'est-ce que Docker Hub ?**
- a) Un forum pour la communauté Docker.
- b) Un service de registre dans le cloud pour les images Docker.
- c) Un outil de gestion de conteneurs.
- d) Une version payante de Docker.

_Réponse(s) : b)_ 

**9. À quoi sert la commande `docker run` ?**
- a) À construire une image Docker.
- b) À créer et démarrer un conteneur à partir d'une image.
- c) À supprimer un conteneur.
- d) À lister les images disponibles.

_Réponse(s) : b)_ 

**10. Comment s'appelle le fichier qui contient les instructions pour construire une image Docker ?**
- a) `Docker.file`
- b) `docker-compose.yml`
- c) `Dockerfile`
- d) `build.docker`

_Réponse(s) : c)_ 

---

### Questions de difficulté moyenne

**11. Quelle est l'utilité des couches (layers) dans une image Docker ?**
- a) Elles permettent de réduire la taille de l'image.
- b) Elles facilitent le partage de composants entre différentes images.
- c) Elles accélèrent la construction des images grâce à la mise en cache.
- d) Elles n'ont pas d'utilité particulière.

_Réponse(s) : a, b, c)_ 

**12. Qu'est-ce que la stratégie COW (Copy-On-Write) dans Docker ?**
- a) Une nouvelle couche est créée au-dessus des autres lorsqu'une modification est apportée.
- b) Les données sont copiées à chaque lecture.
- c) Les couches de l'image sont modifiables directement.
- d) C'est une stratégie de sauvegarde des conteneurs.

_Réponse(s) : a)_ 

**13. Quelle commande permet de supprimer toutes les images non utilisées ?**
- a) `docker image prune -a`
- b) `docker rmi --all`
- c) `docker image clean`
- d) `docker clear images`

_Réponse(s) : a)_ 

**14. À quoi sert l'option `-d` dans la commande `docker run` ?**
- a) Pour exécuter le conteneur en mode débogage.
- b) Pour exécuter le conteneur en arrière-plan.
- c) Pour supprimer le conteneur après son exécution.
- d) Pour définir le répertoire de travail du conteneur.

_Réponse(s) : b)_ 

**15. Comment peut-on persister les données d'un conteneur Docker ?**
- a) En utilisant des volumes Docker.
- b) En utilisant des bind mounts.
- c) En utilisant `tmpfs` pour stocker les données en RAM.
- d) Les données sont persistées par défaut.

_Réponse(s) : a, b, c)_ 

**16. Quelle est la différence entre un volume Docker et un bind mount ?**
- a) Les volumes sont gérés par Docker, tandis que les bind mounts sont liés à un répertoire spécifique de l'hôte.
- b) Les bind mounts sont plus performants que les volumes.
- c) Il n'y a pas de différence, ce sont deux noms pour la même chose.
- d) Les volumes ne peuvent pas être partagés entre les conteneurs.

_Réponse(s) : a)_ 

**17. À quoi sert le port-mapping dans Docker ?**
- a) À rediriger le trafic d'un port de la machine hôte vers un port du conteneur.
- b) À définir le port sur lequel l'application dans le conteneur doit écouter.
- c) À bloquer l'accès à certains ports du conteneur.
- d) À lister les ports ouverts sur la machine hôte.

_Réponse(s) : a)_ 

**18. Quelle est la syntaxe pour mapper le port 8080 de l'hôte au port 80 du conteneur ?**
- a) `-p 80:8080`
- b) `-p 8080:80`
- c) `--port 8080->80`
- d) `--map-port 80,8080`

_Réponse(s) : b)_ 

**19. Quelle instruction Dockerfile est utilisée pour spécifier l'image de base ?**
- a) `BASEIMAGE`
- b) `FROM`
- c) `IMAGE`
- d) `START_WITH`

_Réponse(s) : b)_ 

**20. Quelle est la différence entre les instructions `RUN` et `CMD` dans un Dockerfile ?**
- a) `RUN` exécute des commandes lors de la construction de l'image, `CMD` spécifie la commande par défaut à exécuter au lancement du conteneur.
- b) `CMD` exécute des commandes lors de la construction de l'image, `RUN` spécifie la commande par défaut.
- c) Il n'y a pas de différence.
- d) `RUN` est utilisé pour les commandes courtes, `CMD` pour les commandes longues.

_Réponse(s) : a)_ 

**21. À quoi sert l'instruction `COPY` dans un Dockerfile ?**
- a) À copier des fichiers depuis le contexte de build vers le système de fichiers du conteneur.
- b) À copier des fichiers entre deux conteneurs.
- c) À télécharger des fichiers depuis une URL.
- d) À créer une copie de l'image.

_Réponse(s) : a)_ 

**22. Qu'est-ce que Docker Compose ?**
- a) Un outil pour définir et exécuter des applications multi-conteneurs.
- b) Une interface graphique pour Docker.
- c) Un langage de script pour Docker.
- d) Un service de cloud pour héberger des conteneurs.

_Réponse(s) : a)_ 

**23. Quel est le nom du fichier de configuration par défaut de Docker Compose ?**
- a) `compose.yml`
- b) `docker-compose.yaml`
- c) `docker-compose.yml`
- d) `config.yml`

_Réponse(s) : b, c)_ 

**24. Quelle commande lance tous les services définis dans un fichier Docker Compose ?**
- a) `docker-compose start`
- b) `docker-compose run`
- c) `docker-compose up`
- d) `docker-compose exec`

_Réponse(s) : c)_ 

**25. Comment peut-on voir les logs d'un conteneur spécifique ?**
- a) `docker logs <container_name>`
- b) `docker container logs <container_name>`
- c) `docker show logs <container_name>`
- d) `docker tail <container_name>`

_Réponse(s) : a, b)_ 

**26. Quelle est l'utilité de l'option `-it` dans la commande `docker run` ?**
- a) Pour exécuter le conteneur en mode interactif avec un pseudo-TTY.
- b) Pour installer des paquets dans le conteneur.
- c) Pour inspecter le conteneur.
- d) Pour ignorer les erreurs au démarrage.

_Réponse(s) : a)_ 

**27. Quelle instruction Dockerfile est utilisée pour exposer un port ?**
- a) `PORT`
- b) `LISTEN`
- c) `EXPOSE`
- d) `OPEN`

_Réponse(s) : c)_ 

**28. Qu'est-ce que le contexte de build Docker ?**
- a) L'ensemble des fichiers accessibles pendant la construction de l'image.
- b) La version de Docker utilisée pour le build.
- c) Les variables d'environnement disponibles.
- d) Le nom de l'image en cours de construction.

_Réponse(s) : a)_ 

**29. Quelle commande permet de construire une image à partir d'un Dockerfile ?**
- a) `docker build .`
- b) `docker image build .`
- c) `docker create image .`
- d) `docker make .`

_Réponse(s) : a, b)_ 

**30. Comment peut-on nommer une image lors de sa construction ?**
- a) En utilisant l'option `--name`
- b) En utilisant l'option `-t` ou `--tag`
- c) En utilisant l'option `-n`
- d) Le nom est généré automatiquement et ne peut pas être changé.

_Réponse(s) : b)_ 

---

### Questions difficiles

**31. Quelle est la différence entre `ENTRYPOINT` et `CMD` dans un Dockerfile ?**
- a) `ENTRYPOINT` configure un conteneur qui s'exécutera comme un exécutable, tandis que `CMD` peut être facilement surchargé depuis la ligne de commande.
- b) `CMD` est obligatoire, `ENTRYPOINT` est optionnel.
- c) `ENTRYPOINT` ne peut pas être utilisé avec `CMD`.
- d) Il n'y a pas de différence fonctionnelle, juste une convention de nommage.

_Réponse(s) : a)_ 

**32. À quoi sert un build multi-stage dans un Dockerfile ?**
- a) À construire des images pour différentes architectures (x86, ARM).
- b) À réduire la taille de l'image finale en séparant les dépendances de build de l'environnement d'exécution.
- c) À accélérer le processus de build en parallélisant les étapes.
- d) À créer plusieurs images à partir d'un seul Dockerfile.

_Réponse(s) : b)_ 

**33. Par défaut, sur quelle interface réseau Docker publie-t-il les ports ?**
- a) `127.0.0.1` (localhost)
- b) `0.0.0.0` (toutes les interfaces)
- c) L'interface réseau principale de la machine hôte.
- d) Docker ne publie pas de ports par défaut.

_Réponse(s) : b)_ 

**34. Qu'est-ce que Docker Swarm ?**
- a) Un outil de monitoring pour Docker.
- b) Un outil d'orchestration de conteneurs natif à Docker.
- c) Un service de stockage pour les images Docker.
- d) Une alternative à Docker Compose.

_Réponse(s) : b)_ 

**35. Comment peut-on limiter les ressources (CPU, mémoire) d'un conteneur ?**
- a) En utilisant les options `--cpus` et `--memory` de la commande `docker run`.
- b) Ce n'est pas possible de limiter les ressources.
- c) En modifiant la configuration du démon Docker.
- d) En utilisant un fichier de configuration spécifique.

_Réponse(s) : a)_ 

**36. À quoi sert le fichier `.dockerignore` ?**
- a) À spécifier les conteneurs à ignorer lors d'un `docker-compose up`.
- b) À exclure des fichiers et des répertoires du contexte de build.
- c) À ignorer certaines erreurs lors de la construction de l'image.
- d) À lister les images Docker à ne pas supprimer.

_Réponse(s) : b)_ 

**37. Quelle est la différence entre `docker stop` et `docker kill` ?**
- a) `docker stop` envoie un signal `SIGTERM` puis `SIGKILL` après un temps d'attente, tandis que `docker kill` envoie directement `SIGKILL`.
- b) `docker kill` est un alias pour `docker stop`.
- c) `docker stop` met le conteneur en pause, `docker kill` l'arrête définitivement.
- d) Il n'y a pas de différence.

_Réponse(s) : a)_ 

**38. Qu'est-ce qu'un réseau de type `bridge` dans Docker ?**
- a) Un réseau qui connecte les conteneurs à la machine hôte et au monde extérieur.
- b) Un réseau qui isole complètement les conteneurs.
- c) Un réseau qui permet une communication directe entre les conteneurs et le réseau de l'hôte.
- d) Un type de réseau utilisé uniquement par Docker Swarm.

_Réponse(s) : a)_ 

**39. Comment peut-on inspecter la configuration détaillée d'un conteneur (IP, volumes, etc.) ?**
- a) `docker info <container_name>`
- b) `docker details <container_name>`
- c) `docker inspect <container_name>`
- d) `docker config <container_name>`

_Réponse(s) : c)_ 

**40. Pour optimiser la taille d'une image, que peut-on faire ?**
- a) Utiliser une image de base légère comme `alpine`.
- b) Combiner plusieurs commandes `RUN` en une seule pour réduire le nombre de couches.
- c) Utiliser un build multi-stage.
- d) Nettoyer les caches et les fichiers temporaires dans la même couche `RUN` où ils ont été créés.

_Réponse(s) : a, b, c, d)_ 
