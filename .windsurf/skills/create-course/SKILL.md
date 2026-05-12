# Create Course Skill

This skill helps create a new course structure for K.School with the proper configuration.

## What it does

1. Asks for the course name in package.json format (e.g., `git`, `docker`, `typescript`)
2. Optionally asks for a course title if needed for clarity
3. Creates the course directory structure
4. Generates `package.json` with proper configuration
5. Creates `slides.md` with the standard header
6. Runs `pnpm install` to set up dependencies

## When to use

- User asks to create a new course
- User wants to add a new training module
- User requests a new presentation setup

## Files created

- `courses/[COURSE_NAME]/package.json`
- `courses/[COURSE_NAME]/slides.md`
