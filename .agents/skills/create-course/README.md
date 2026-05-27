# Create Course Skill

Windsurf skill to quickly scaffold new K.School training courses with proper Slidev configuration.

## What it does

This skill automates the creation of a new course structure with:

- **Course directory** in `courses/[name]/`
- **package.json** with Slidev dependencies and scripts
- **slides.md** with standardized header configuration
- **Automatic dependency installation** via pnpm

## Usage

Simply ask Cascade to create a new course:

```
Create a new course about React
```

```
Add a new training module for Python basics
```

The skill will:

1. Ask for the course name (if not clear from context)
2. Generate an appropriate course title
3. Create all necessary files
4. Install dependencies

## Course Structure

Each course follows this structure:

```
courses/
└── [course-name]/
    ├── package.json      # Slidev configuration
    └── slides.md         # Presentation slides
```

## Configuration

All courses use:

- **Slidev** for presentations
- **Shiki** for syntax highlighting
- **Monaco** editor for interactive code
- **Line numbers** enabled by default

## Examples

Created courses include:

- Git - Gestion de Versions
- Docker - Conteneurisation
- JavaScript - Développement Web
- TypeScript - Programmation Typée
