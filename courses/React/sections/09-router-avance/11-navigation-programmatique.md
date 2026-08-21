---
layout: two-cols-header
layoutClass: gap-x-4
---

# Navigation programmatique

Changer de page depuis le code

::left::

```tsx {all|4|8|all}
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    // ... vérifier le login
    navigate('/dashboard')
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

::right::

<div v-click="1">

`useNavigate()` retourne une fonction que vous pouvez appeler depuis votre code.

</div>

<div v-click="2">

`navigate('/dashboard')` change l'URL et affiche la page correspondante.

</div>

::bottom::

<div v-click="3">

**Autres usages courants**

- Rediriger après une soumission
- Revenir en arrière : `navigate(-1)`
- Aller à l'accueil : `navigate('/')`

</div>

<!--
Comparaison pédagogique : Link, c'est pour les clics dans le HTML ; useNavigate, c'est pour les actions dans le code (soumission, timer, logique métier).
-->
