---
layout: cover
background: https://cover.sli.dev?7
---

# Chapitre 06 - Docker Compose

---

# Docker Compose
C'est quoi

* Docker Compose est **un outil** permettant de définir et **d'exécuter des applications multi-conteneurs**. Il est essentiel pour une expérience de développement et de déploiement simplifiée et efficace.
* Compose simplifie la gestion de l'ensemble de votre pile applicative, facilitant ainsi la **gestion des services, des réseaux et des volumes** dans un seul **fichier de configuration YAML** clair et concis.
* Ensuite, **une simple commande** suffit pour **créer et démarrer tous les services** à partir de ce fichier :

> docker <span class="text-orange">compose</span> <span class="text-blue">up</span> <span class="text-red">-d</span>
> 
> docker <span class="text-orange">compose</span> <span class="text-blue">ps</span>
> 
> docker <span class="text-orange">compose</span> <span class="text-blue">down</span>

---

# Docker Compose
Pourquoi ?

Si nous devions par exemple, lancer une application Wordpress avec Docker, nous devrions faire ceci en ligne de commande :

```bash
# Démarrer le conteneur MySQL
docker run -d --name db --restart always -e MYSQL_DATABASE=exampledb -e MYSQL_USER=exampleuser \
  -e MYSQL_PASSWORD=examplepass -e MYSQL_RANDOM_ROOT_PASSWORD=1 -v db:/var/lib/mysql mysql:8.0

# Démarrer le conteneur WordPress
docker run -d --name wordpress --restart always -p 8080:80 -e WORDPRESS_DB_HOST=db -e WORDPRESS_DB_USER=exampleuser \
  -e WORDPRESS_DB_PASSWORD=examplepass -e WORDPRESS_DB_NAME=exampledb \
  -v wordpress:/var/www/html --link db:db wordpress
```

Plutôt verbeux n'est-ce pas ?

---

# Docker Compose
Pourquoi ?

Grâce à docker-compose, nous pouvons orchestrer nos conteneurs dans un fichier YAML descriptif

<div class="grid grid-cols-2 gap-x-4">

```yaml
services:

  wordpress:
    image: wordpress
    restart: always
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: exampleuser
      WORDPRESS_DB_PASSWORD: examplepass
      WORDPRESS_DB_NAME: exampledb
    volumes:
      - wordpress:/var/www/html
```

```yaml
  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_DATABASE: exampledb
      MYSQL_USER: exampleuser
      MYSQL_PASSWORD: examplepass
      MYSQL_RANDOM_ROOT_PASSWORD: '1'
    volumes:
      - db:/var/lib/mysql

volumes:
  wordpress:
  db:
```

</div>

[Tutoriel pour votre premier docker-compose](https://docs.docker.com/compose/gettingstarted/)
