---
name: create-course
description: Create a new K.School course with proper structure, package.json, slides.md configuration, and dependencies. Use when the user wants to add a new training course or module.
---

# Create Course - Agent Instructions

## Step 1: Get Course Information

Ask the user for the course name in package.json format (lowercase, single word or hyphenated).

Example: `git`, `docker`, `typescript`, `web-fundamentals`

## Step 2: Determine Course Title

Based on the course name, infer an appropriate course title. If the title cannot be reasonably inferred, ask the user for a descriptive course title.

Examples:

- `git` → "Git - Gestion de Versions"
- `docker` → "Docker - Conteneurisation"
- `typescript` → "TypeScript - Programmation Typée"

## Step 3: Create Directory Structure

Create the directory: `./courses/[COURSE_NAME]`

## Step 4: Create package.json

Create `./courses/[COURSE_NAME]/package.json` with this content:

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
    "@slidev/cli": "catalog:",
    "@slidev/theme-default": "catalog:",
    "vue": "catalog:"
  }
}
```

Replace `[COURSE_NAME]` with the actual course name.

## Step 5: Create slides.md

Create `./courses/[COURSE_NAME]/slides.md` with this content:

```markdown
---
titleTemplate: "%s - Kevin UNFRICHT"
title: "[COURSE_TITLE]"
layout: cover
background: https://cover.sli.dev?1
highlighter: shiki
lineNumbers: true
monaco: true
---
```

Replace `[COURSE_TITLE]` with the actual course title.

## Step 6: Install Dependencies

Run `pnpm install` in the course directory and replace `[COURSE_NAME]` with the actual course name:

```bash
pnpm install --filter @k.school/[COURSE_NAME]
```

## Step 7: Confirm Success

Inform the user that the course has been created successfully and provide the path to the new course.
