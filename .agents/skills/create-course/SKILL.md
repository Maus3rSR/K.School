---
name: create-course
description: Create a new K.School course with proper structure, package.json, slides.md configuration, and dependencies. Use when the user wants to add a new training course or module.
---

# Create Course - Agent Instructions

## Step 1: Get Course Information

Ask the user for the course name in package.json format (lowercase, single word or hyphenated).

Example: `git`, `docker`, `typescript`, `web-fundamentals`, `efficient-dev`

## Step 2: Determine Folder Name and Course Title

Based on the course name:

1. **Folder name**: Convert to PascalCase (capitalize first letter of each word, remove hyphens)
2. **Course title**: Infer an appropriate descriptive title

Examples:

- `git` → Folder: `Git`, Title: "Git - Gestion de Versions"
- `docker` → Folder: `Docker`, Title: "Docker - Conteneurisation"
- `typescript` → Folder: `Typescript`, Title: "TypeScript - Programmation Typée"
- `efficient-dev` → Folder: `Efficient-Dev`, Title: "Développement Efficace"

## Step 3: Create Directory Structure

Create the directory: `./courses/[FOLDER_NAME]` (where FOLDER_NAME is in PascalCase)

## Step 4: Create package.json

Create `./courses/[FOLDER_NAME]/package.json` with this content:

```json
{
  "name": "@k.school/[COURSE_NAME]",
  "version": "0.0.1",
  "private": "true",
  "type": "module",
  "scripts": {
    "build": "slidev build",
    "dev": "slidev --open",
    "export": "slidev export"
  },
  "dependencies": {
    "@k.school/slidev-addon-ui": "catalog:",
    "@slidev/cli": "catalog:",
    "@slidev/theme-default": "catalog:",
    "vue": "catalog:"
  }
}
```

Replace `[FOLDER_NAME]` with the PascalCase folder name and `[COURSE_NAME]` with the kebab-case package name.

## Step 5: Create slides.md

Create `./courses/[FOLDER_NAME]/slides.md` with this content:

```markdown
---
titleTemplate: "%s - Kevin UNFRICHT"
title: "[COURSE_TITLE]"
layout: cover
background: https://cover.sli.dev?1
highlighter: shiki
lineNumbers: true
monaco: true
addons:
  - "@k.school/slidev-addon-ui"
---
```

Replace `[COURSE_TITLE]` with the actual course title.

## Step 6: Install Dependencies

Run `pnpm install` in the course directory and replace `[COURSE_NAME]` with the actual course name:

```bash
pnpm install --filter @k.school/[COURSE_NAME]
```

## Step 7: Add Dev Script to Root package.json

Add a new dev script to the root `package.json` file in the scripts section. Follow the naming pattern `[COURSE_NAME]:dev` and place it alphabetically among the course-specific dev scripts.

Example for a React course:

```json
"react:dev": "turbo run dev --filter @k.school/react"
```

## Step 8: Confirm Success

Inform the user that the course has been created successfully and provide the path to the new course.
