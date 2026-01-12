# Commit Message Guidelines

This project uses **conventional commits** with commitlint validation.

## Required Format

```
type: subject (max 100 chars)

- Body line 1 (max 100 chars per line)
- Body line 2 (max 100 chars per line)
```

## Valid Commit Types

- `feat` - New features
- `fix` - Bug fixes
- `chore` - Tooling, setup, dependencies, configuration
- `docs` - Documentation changes only
- `style` - Code formatting (not CSS)
- `refactor` - Code restructuring without changing behavior
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `build` - Build system changes
- `ci` - CI/CD pipeline changes
- `revert` - Reverting previous changes

## Rules

1. **Subject line**:
   - Must start with a type followed by a colon
   - Use imperative mood ("add" not "added" or "adds")
   - Maximum 100 characters
   - Lowercase after the type
   - No period at the end

2. **Body**:
   - Must have a blank line between subject and body
   - Each line maximum 100 characters
   - Use bullet points for multiple items
   - Optional but recommended for complex changes

## Examples

### Good ✓

```
feat: add user authentication with JWT

- Implement login and registration endpoints
- Add JWT token generation and validation
- Create authentication middleware for protected routes
```

```
fix: resolve memory leak in image processing

- Add proper cleanup in useEffect hook
- Remove event listeners on component unmount
```

```
chore: add initial Next.js blog setup with i18n support

- Configure Next.js with TypeScript, Tailwind CSS, and app router
- Set up internationalization for multiple languages
- Add blog functionality with MDX posts and search
```

### Bad ✗

```
Add new feature
(missing type)
```

```
feat: added user authentication with JWT tokens and also updated the database schema
(subject too long, past tense)
```

```
feat: add authentication
Body starts here without blank line
(no blank line between subject and body)
```
