---
layout: chapter
transition: slide-left | slide-right
number: 03
duration: 15 min
---

# Le mot de passe haché

- Lire ce que la base stocke vraiment
- Distinguer hachage et chiffrement
- Créer le compte de démonstration dans un seeder

<!--
Transition : Alice a tapé « secret123 » en clair dans Tinker. Ouvrons la table users.
Découpage : ≈ 6 min de slides (≈ 6 slides), démo flash ≈ 2 min — moments : `User::first()->password` dans Tinker, `Hash::check()` vrai puis faux, `migrate:fresh --seed` puis connexion avec le compte démo ; micro-pratique ≈ 7 min (slide « À vous », étape A3 + point de contrôle 1).
Moment léger : « Le jour où un site vous renvoie votre mot de passe par mail en clair, fuyez. Et dites-leur d'aller voir le chapitre 03. »
Tag Campus Quest de fin de chapitre : s6-ch3-mot-de-passe.
-->

---
transition: slide-up | slide-down
---

# À votre avis ?

<Quiz
  question="Alice a été créée avec le mot de passe secret123. Que contient sa colonne password dans la table users ?"
  :options="[
    'secret123 : la base est privée, personne d\'autre ne la lit',
    'secret123 chiffré : Laravel le déchiffre à chaque connexion pour comparer',
    'Une empreinte calculée à partir de secret123, impossible à retransformer en secret123',
    'Rien : le mot de passe est gardé dans la session, pas en base'
  ]"
  :answer="2"
/>

<!--
Faites voter : la réponse « chiffré » est la plus populaire, et c'est le piège.
- « La base est privée » : jusqu'au jour de la fuite (sauvegarde perdue, injection SQL — chapitre 08).
- « Chiffré » : si Laravel peut déchiffrer, un attaquant qui vole la clé (.env) le peut aussi.
- « En session » : la session retient QUI est connecté, jamais le mot de passe.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Ce que la base a enregistré

::left::

<Terminal
  title="tinker" prompt=">" :clicks="true"
  :lines="[
    { lang: 'php', cmd: 'User::first()->password', out: '= &quot;$2y$12$Qh1bX8bE6m0w3Q9Zs4bKXeX0yq0V4uP2rT9mKjzF1sYwq3NnLh0yW&quot;' },
    { lang: 'php', cmd: 'Hash::check(\'secret123\', User::first()->password)', out: '= true' },
    { lang: 'php', cmd: 'Hash::check(\'Secret123\', User::first()->password)', out: '= false' }
  ]"
/>

::right::

<div v-click="1">

Pas une trace de `secret123` : la colonne contient une <KeyTerm>empreinte</KeyTerm> de 60 caractères.

</div>

<div v-click="2">

`Hash::check()` recalcule l'empreinte de la saisie et la **compare** à celle stockée.

</div>

<div v-click="3">

Une seule majuscule de différence : empreinte différente, connexion refusée.

</div>

<!--
Démo : exactement ces trois commandes, sur le compte Alice du chapitre 02.
Dans Tinker, le mot de passe s'affiche parce qu'on lit l'attribut directement ; dans un toArray() ou un JSON, il est masqué ($hidden du modèle User).
Le même calcul ne redonne jamais deux fois la même chaîne : relancez Hash::make('secret123') deux fois devant la salle — deux empreintes différentes, et pourtant Hash::check accepte les deux (c'est le sel, slide suivante).
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Hacher n'est pas chiffrer

::left::

<Definition term="Hachage" translation="(Hashing)">

Un calcul **à sens unique** : de `secret123` on obtient l'empreinte, mais de l'empreinte on ne retrouve jamais `secret123`.

</Definition>

<v-click>

<Analogy title="Le hachoir" icon="🔪">

On passe un steak au hachoir : facile. Reconstituer le steak à partir de la viande hachée : impossible.

</Analogy>

</v-click>

::right::

<v-click>

| | **Chiffrement** | **Hachage** |
|---|---|---|
| **Retour arrière** | Oui, avec la clé | Jamais |
| **Usage** | Données à relire (un IBAN) | Secret à vérifier (un mot de passe) |
| **Si la clé fuit** | Tout est lisible | Pas de clé à voler |

</v-click>

::bottom::

<v-click>

L'empreinte `$2y$12$…` se lit : algorithme **bcrypt** (`2y`), coût **12** (lent exprès), puis un **sel** aléatoire et l'empreinte. Le sel fait que deux comptes `secret123` ont deux empreintes différentes.

</v-click>

<!--
« Lent exprès » : bcrypt coût 12 = quelques dizaines de millisecondes par essai. Imperceptible pour un utilisateur, rédhibitoire pour un attaquant qui veut tester des milliards de mots de passe.
Le sel empêche les tables précalculées (« rainbow tables ») : l'attaquant devrait tout recalculer pour chaque compte.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Qui hache le mot de passe ?
`app/Models/User.php`, déjà en place depuis la S1

::left::

```php {5}
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
```

::right::

<Steps
  direction="vertical"
  :clicks="true"
  :items="[
    { title: 'Création', desc: 'Le cast hashed transforme secret123 en empreinte avant l\'INSERT', icon: '💾' },
    { title: 'Connexion', desc: 'Auth::attempt() appelle Hash::check(saisie, empreinte)', icon: '🔑' }
  ]"
/>

<!--
Le cast hashed (Laravel 10+) : toute valeur affectée à password est hachée automatiquement, sauf si c'est déjà une empreinte. Voilà pourquoi User::create(['password' => 'secret123']) a fonctionné.
Avant ce cast, on écrivait Hash::make($request->password) à la main — vous le verrez dans de vieux tutoriels, et dans RegisteredUserController de Breeze.
-->

---
layout: two-cols-bottom
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Le compte de démonstration
`database/seeders/UserSeeder.php`

::left::

```php {all|3-7|all}
public function run(): void
{
    User::factory()->create([
        'name' => 'Joueur démo',
        'email' => 'joueur@campus-quest.test',
        'password' => 'joueur1234',
    ]);
}
```

<div v-click="2">

<Terminal
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan migrate:fresh --seed' }
  ]"
/>

</div>

::right::

<div v-click="1">

La **factory** de `User` (fournie par Laravel) complète les autres colonnes ; le cast hache `joueur1234`.

</div>

<div v-click="2">

`UserSeeder::class` s'ajoute à la liste de `DatabaseSeeder` (S3), puis on recrée la base.

</div>

::bottom::

<div v-click="2">

Retenez : un compte démo en clair dans un seeder, c'est **pour le développement** uniquement — jamais en production.

</div>

<!--
Démo : migrate:fresh --seed, puis connexion avec joueur@campus-quest.test / joueur1234. Alice a disparu (la base est recréée) : c'est normal.
Le compte du Maître du jeu arrive au chapitre 05, quand la colonne is_admin existera.
Les comptes de test figureront dans le README du projet (critère transverse de l'évaluation).
-->

---
transition: slide-up | slide-down
---

# À vous : le compte démo

<Exercise title="WishFlix — le compte démo de la maquette" duration="7 min" level="guidé"
  :criteria="[
    'migrate:fresh --seed crée le compte demo@wishflix.com',
    'Dans Tinker, son mot de passe commence par $2y$12$',
    'Vous vous connectez avec demo@wishflix.com / demo1234'
  ]"
  :hints="[
    'sail artisan make:seeder UserSeeder',
    'User::factory()->create([...]) avec name, email et password',
    'N\'oubliez pas d\'appeler UserSeeder dans DatabaseSeeder'
  ]">

**Exercice** `06-authentification-securite` — étape **A3** du README, puis **point de contrôle 1**.

La maquette `login.html` annonçait un compte démo : créez-le pour de vrai.

</Exercise>

<!--
Point de contrôle 1 dans le README (après A3). Palier de rattrapage : tags Campus Quest s6-ch1-breeze, s6-ch2-connexion et s6-ch3-mot-de-passe.
migrate:fresh efface les jeux créés à la main en S5 : les seeders de la S3 recréent le catalogue.
-->
