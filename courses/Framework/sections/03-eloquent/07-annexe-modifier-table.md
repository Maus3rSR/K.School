---
transition: slide-up | slide-down
---

# Modifier une table déjà jouée
Et vous, que feriez-vous ?

<Quiz
  question="La migration create_locations_table est déjà jouée — par vous ET par toute l'équipe. Vous devez ajouter une colonne address. Que faites-vous ?"
  :options="[
    'Vous ajoutez la colonne dans create_locations_table puis sail artisan migrate',
    'Vous ajoutez la colonne dans create_locations_table puis sail artisan migrate:fresh',
    'Vous créez une nouvelle migration add_address_to_locations_table puis sail artisan migrate',
    'Vous ajoutez la colonne à la main dans MariaDB, sans migration'
  ]"
  :answer="2"
/>

<!--
Annexe du chapitre 1 : hors du parcours principal — à dérouler seulement s'il reste du temps (approfondissement « modifier une table déjà jouée »).
Pré-test AVANT la règle : laissez chacun voter à main levée avant de révéler.
L'option migrate:fresh est la plus tentante : ça marche sur VOTRE poste… mais c'est une hérésie en équipe (données perdues, schéma désynchronisé). La slide suivante tranche.
Moment léger : la 4e réponse a un nom — « le hotfix en prod à 23 h ». Personne n'a jamais retrouvé qui l'avait fait.
-->

---
layout: two-cols-header
layoutClass: gap-x-6
transition: slide-up | slide-down
---

# Modifier une table déjà jouée
Nouvelle migration, jamais de retouche

::left::

<Terminal
  class="text-sm"
  title="bash" prompt="$"
  :lines="[
    { cmd: 'sail artisan make:migration add_address_to_locations_table --table=locations', out: '   INFO  Migration [database/migrations/2026_…_add_address_to_locations_table.php] created successfully.' }
  ]"
/>

<div class="text-xs opacity-75 mt-2">

`--table=locations` dit à Artisan de générer `Schema::table` — **modifier** l'existante — au lieu d'un `Schema::create`.

</div>

<v-click>

<KeyPoint class="text-sm" variant="rule" title="Règle d'or" icon="📏">

`Schema::table` **modifie** une table existante, `Schema::create` la crée. Modifier un fichier déjà joué n'a aucun effet : `migrate` ne rejoue jamais une migration.

</KeyPoint>

</v-click>

::right::

<v-click>

```php
public function up(): void
{
    Schema::table('locations', function (Blueprint $table) {
        $table->string('address')->nullable();
    });
}

public function down(): void
{
    Schema::table('locations', function (Blueprint $table) {
        $table->dropColumn('address');
    });
}
```

</v-click>

<!--
Moment de démo jetable (facultatif, ≈ 2 min) : créer cette migration, la jouer, la rollback, puis SUPPRIMER le fichier — la solution Campus Quest ne contient pas de colonne address.
Le ->nullable() est nécessaire : la table contient déjà des lignes, qui n'ont pas d'adresse.
Le down() d'un ajout de colonne : dropColumn — toujours l'inverse exact du up().
Exception à connaître : tant que personne d'autre n'a joué la migration, un rollback + retouche + migrate reste acceptable sur votre poste. Dès qu'elle est poussée, c'est fini.
Revenir au vote : qui avait deviné la nouvelle migration ?
-->
