---
layout: center
class: text-center
---

# Ce qu'on a appris aujourd'hui

&nbsp;

```mermaid {scale: 0.75}
flowchart LR
    A["🖱️ Événements\nonClick · onChange · onSubmit"] --> B["⚡ Event handlers\nfonctions typées"]
    B --> C["🧠 useState\nmémoriser & mettre à jour"]
    C --> D["🔄 Re-rendu\nReact met à jour l'UI"]

    style A fill:#3b82f6,color:#fff
    style B fill:#8b5cf6,color:#fff
    style C fill:#f59e0b,color:#fff
    style D fill:#10b981,color:#fff
```

<v-click>

<br/>

**La formule s'enrichit**

$$UI = f(state)$$

L'interface est maintenant une fonction de l'**état interne** — et cet état évolue en réponse aux **actions de l'utilisateur**.

</v-click>

<!--
Rappeler la progression : S1 Setup → S2 Composants → S3 Props → S4 State → S5 Listes & rendu conditionnel.
La formule UI = f(state) étend UI = f(data) vue en S3 : state est une forme de data qui vit dans le composant.
-->
