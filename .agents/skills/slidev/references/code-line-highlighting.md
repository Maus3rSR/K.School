---
name: line-highlighting
description: Highlight specific lines in code blocks with static or click-based dynamic highlighting
---

# Line Highlighting

Highlight specific lines in code blocks.

## Static Highlighting

````md
```ts {2,3}
function add(
  a: Ref<number> | number,
  b: Ref<number> | number
) {
  return computed(() => unref(a) + unref(b))
}
```
````

## Dynamic (Click-based)

Use `|` to separate stages:

````md
```ts {2-3|5|all}
function add(
  a: Ref<number> | number,
  b: Ref<number> | number
) {
  return computed(() => unref(a) + unref(b))
}
```
````

Click progression: lines 2-3 → line 5 → all lines

### Non-consecutive lines in a stage

Use commas within a `|`-separated stage to highlight multiple non-consecutive lines at the same click step:

````md
```ts {all|1,5,10|6,9|7,8|all}
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
```
````

Click progression: all → lines 1, 5, 10 → lines 6, 9 → lines 7, 8 → all

Commas and ranges can be combined freely in a single stage: `{1,3-5|2,8|all}`.

## Special Values

- `hide` - Hide the code block
- `none` - Show code without highlighting
- `all` - Highlight all lines

````md
```ts {hide|none|all}
// Hidden → No highlight → All highlighted
```
````
