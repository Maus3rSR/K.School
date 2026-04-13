# AI Agent Rules for Course Development

## Sli.dev Presentation Framework

### Core Capabilities

#### 1. Slide Syntax
- **Slide Separators**: Use `---` padded with new lines to separate slides
- **Frontmatter**: Configure slides using YAML format at the beginning of each slide
  - First frontmatter block is the **headmatter** (configures entire deck)
  - Subsequent frontmatters configure individual slides
  - Common properties: `theme`, `layout`, `background`, `class`, `title`
- **Notes**: Add presenter notes using HTML comments at the end of slides (`<!-- note content -->`)

#### 2. Code Blocks
- Built-in **Shiki** syntax highlighter
- Support for multiple programming languages
- Markdown-flavored code blocks with syntax highlighting
- Example: ` ```ts console.log('Hello, World!') ``` `

#### 3. Mathematical & Diagram Support
- **LaTeX Blocks**: For mathematical and chemical formulas
- **Mermaid**: Text-based diagrams
- **PlantUML**: UML diagrams from text

#### 4. Styling
- **Comark Syntax**: Easy way to apply styles and classes to elements
- **Scoped CSS**: Style individual slides with scoped CSS blocks
- **UnoCSS**: Built-in utility-first CSS framework for styling
- **Vue Components**: Full Vue component support in slides

#### 5. Built-in Components
Sli.dev provides numerous built-in components:
- `<Arrow>` - Draw arrows on slides
- `<VDragArrow>` - Draggable arrows
- `<AutoFitText>` - Auto-sizing text
- `<LightOrDark>` - Theme-aware content
- `<Link>` - Enhanced links
- `<RenderWhen>` - Conditional rendering
- `<SlideCurrentNo>` - Current slide number
- `<SlidesTotal>` - Total slides count
- `<Toc>` - Table of contents
- `<Transform>` - Element transformations
- `<Tweet>` - Embed tweets
- `<VAfter>`, `<VClick>`, `<VClicks>` - Click animations
- `<VSwitch>` - Switch between content
- `<VDrag>` - Draggable elements
- `<SlidevVideo>` - Video player
- `<Youtube>` - YouTube embeds

#### 6. Animation System
- **Click Animations**: 
  - `v-click` directive for sequential reveals
  - `v-after` for content after clicks
  - `v-clicks` for multiple elements
  - Custom positioning and timing
- **Motion**: Animation library integration
- **Slide Transitions**: Built-in transitions between slides
- **Element Transitions**: Smooth transitions for individual elements
- **View Transition API**: Modern browser transitions

#### 7. Advanced Features
- **Importing Slides**: Import slides from external files using `src` in frontmatter
- **Layouts**: Multiple built-in layouts (center, cover, etc.)
- **Themes & Addons**: Extensible theme and addon system
- **Exporting**: Export to PDF, PNG, or host online
- **Presenter Mode**: Dedicated presenter view with notes

### Configuration Options
- **Highlighter**: Configure Shiki syntax highlighting
- **Vite & Plugins**: Customize build process
- **Vue App**: Configure Vue application
- **UnoCSS**: Customize utility classes
- **Code Runners**: Execute code in slides
- **Transformers**: Custom content transformers
- **Monaco**: Code editor integration
- **KaTeX**: Math rendering
- **Mermaid**: Diagram rendering
- **Routes**: Custom routing
- **Shortcuts**: Keyboard shortcuts
- **Context Menu**: Custom context menu
- **Fonts**: Font configuration

## Sli.dev Documentation Reference Links

### Essential Guides
- **Getting Started**: https://sli.dev/guide/
- **Syntax Guide**: https://sli.dev/guide/syntax
- **Animations**: https://sli.dev/guide/animations
- **User Interface**: https://sli.dev/guide/ui
- **Theme & Addons**: https://sli.dev/guide/theme-addon
- **Components**: https://sli.dev/guide/component
- **Layouts**: https://sli.dev/guide/layout
- **Exporting**: https://sli.dev/guide/exporting
- **Hosting**: https://sli.dev/guide/hosting
- **Work with AI**: https://sli.dev/guide/work-with-ai
- **FAQ**: https://sli.dev/guide/faq

### Advanced Topics
- **Global Context**: https://sli.dev/guide/global-context
- **Writing Layouts**: https://sli.dev/guide/write-layout
- **Writing Themes**: https://sli.dev/guide/write-theme
- **Writing Addons**: https://sli.dev/guide/write-addon

### Built-in Features
- **CLI**: https://sli.dev/builtin/cli
- **Built-in Components**: https://sli.dev/builtin/components
- **Built-in Layouts**: https://sli.dev/builtin/layouts

### Customization
- **Configurations**: https://sli.dev/custom/
- **Directory Structure**: https://sli.dev/custom/directory-structure
- **Configure Highlighter**: https://sli.dev/custom/config-highlighter
- **Configure Vite**: https://sli.dev/custom/config-vite
- **Configure Vue App**: https://sli.dev/custom/config-vue
- **Configure UnoCSS**: https://sli.dev/custom/config-unocss
- **Configure Code Runners**: https://sli.dev/custom/config-code-runners
- **Configure Transformers**: https://sli.dev/custom/config-transformers
- **Configure Monaco**: https://sli.dev/custom/config-monaco
- **Configure KaTeX**: https://sli.dev/custom/config-katex
- **Configure Mermaid**: https://sli.dev/custom/config-mermaid
- **Configure Routes**: https://sli.dev/custom/config-routes
- **Configure Shortcuts**: https://sli.dev/custom/config-shortcuts
- **Configure Fonts**: https://sli.dev/custom/config-fonts

### Resources
- **Showcases**: https://sli.dev/resources/showcases
- **Theme Gallery**: https://sli.dev/resources/theme-gallery
- **Addon Gallery**: https://sli.dev/resources/addon-gallery
- **Learning Resources**: https://sli.dev/resources/learning
- **Curated Covers**: https://sli.dev/resources/covers

### Main Documentation
- **Features Overview**: https://sli.dev/features/
- **Official Website**: https://sli.dev/

---

## Vue.js Development - MCP Integration

### Mandatory Rule: Use Vue MCP for All Vue Features

**CRITICAL**: For **ALL** Vue.js related features, questions, documentation, or implementation:
- **MUST** use the `vue-docs` MCP server
- **NEVER** rely solely on training data for Vue information
- **ALWAYS** query the MCP for up-to-date Vue documentation

### Available Vue MCP Tools

#### 1. `mcp3_vue_docs_search`
- **Purpose**: Search Vue.js documentation
- **Usage**: Hybrid semantic + keyword search
- **Parameters**:
  - `query`: Developer question or topic about Vue.js
  - `max_results`: Number of sections to return (1-20, default: 3)
  - `scope`: Documentation section (default: 'all')

#### 2. `mcp3_vue_api_lookup`
- **Purpose**: Look up Vue.js API by exact name
- **Usage**: Fast-path for API references
- **Parameters**:
  - `api_name`: Exact Vue.js API name
- **Note**: Read `vue://api/index` resource to browse all available API names

#### 3. `mcp3_vue_get_related`
- **Purpose**: Find related Vue.js documentation
- **Usage**: Discover related concepts, APIs, and documentation
- **Parameters**:
  - `topic`: Vue.js API name, concept, or topic

#### 4. `mcp3_ecosystem_search`
- **Purpose**: Search across entire Vue ecosystem
- **Usage**: Search Vue.js, Vue Router, and other frameworks
- **Parameters**:
  - `query`: Developer question about Vue ecosystem
  - `max_results`: Number of sections to return (1-20, default: 5)
  - `scope`: Documentation section (default: 'all')

#### 5. `mcp3_set_framework_preferences`
- **Purpose**: Activate/deactivate Vue ecosystem frameworks
- **Usage**: Match project's tech stack
- **Available Frameworks**:
  - `vue`: Vue.js (active by default)
  - `vue_router`: Vue Router
  - `pinia`: State management
  - `nuxt`: Nuxt framework
  - `vite`: Build tool
  - `vitest`: Testing framework
  - `vueuse`: Composition utilities
  - `vue_devtools`: Developer tools

### Available Vue MCP Resources

#### Documentation Resources
- `vue://topics` - Complete table of contents
- `vue://topics/{section}` - TOC for specific section
- `vue://pages/{path}` - Raw markdown pages
- `vue://api/index` - Complete API index
- `vue://scopes` - Valid search scope values
- `ecosystem://preferences` - Current framework settings
- `ecosystem://sources` - Available documentation sources

#### Key Documentation Sections
- Guide: `vue://topics/guide`
- API Reference: `vue://topics/api`
- Examples: `vue://topics/examples`
- Style Guide: `vue://topics/style-guide`
- Tutorial: `vue://topics/tutorial`

### Workflow for Vue Development

1. **Before implementing any Vue feature**:
   - Query `mcp3_vue_docs_search` for relevant documentation
   - Use `mcp3_vue_api_lookup` for specific API details
   - Check `mcp3_vue_get_related` for related concepts

2. **For Sli.dev + Vue integration**:
   - Sli.dev is built on Vue.js
   - All Vue features are available in slides
   - Use Vue MCP to ensure correct Vue syntax and best practices
   - Leverage Vue components, directives, and composition API

3. **For ecosystem tools**:
   - Activate relevant frameworks using `mcp3_set_framework_preferences`
   - Use `mcp3_ecosystem_search` for cross-framework queries

### Best Practices

1. **Always verify** Vue syntax and features using MCP before implementation
2. **Prefer Composition API** for modern Vue development in Sli.dev
3. **Use TypeScript** when possible for better type safety
4. **Leverage built-in Sli.dev components** before creating custom ones
5. **Follow Vue style guide** (accessible via `vue://topics/style-guide`)
6. **Test animations** and transitions in presenter mode
7. **Optimize performance** for smooth slide transitions
8. **Use scoped styles** to avoid CSS conflicts between slides

---

## Integration Guidelines

When creating Sli.dev presentations:
1. Use Vue MCP to verify all Vue component syntax
2. Leverage Sli.dev's built-in components for common patterns
3. Apply UnoCSS for styling (check compatibility with Vue)
4. Use click animations (`v-click`, `v-after`) for progressive disclosure
5. Add presenter notes for teaching context
6. Export to multiple formats for accessibility
7. Test in both presenter and viewer modes

**Remember**: Sli.dev presentations are Vue applications. Every Vue feature must be validated through the vue-docs MCP server