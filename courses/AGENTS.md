# AI Agent Rules for Course Development

## Sli.dev Presentation Framework

### **MANDATORY: Use the Slidev Skill**

**CRITICAL**: For **ALL** Slidev/Sli.dev related features, documentation, or implementation:
- **MUST** use the `slidev` skill installed at `.windsurf/skills/slidev`
- **NEVER** rely solely on training data for Slidev information
- **ALWAYS** invoke the skill for up-to-date Slidev documentation and best practices

### How to Use the Slidev Skill

The Slidev skill provides comprehensive knowledge about:
- Creating and presenting web-based slidedecks
- Markdown syntax for slides
- Vue components integration
- Code highlighting and animations
- Interactive features
- Technical presentations and teaching materials

**To access Slidev documentation and capabilities**, invoke the skill using the appropriate skill invocation method provided by your agent system.

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