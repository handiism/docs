# Docusaurus Native Broken Link Detection

This document explains how Docusaurus automatically detects broken links during the build process.

## How It Works

Docusaurus has a built-in configuration option called `onBrokenLinks` that controls how the build process handles broken links.

### Configuration

In [docusaurus.config.ts](file:///home/handiism/Developments/docs/docusaurus.config.ts), line 28:

```typescript
onBrokenLinks: 'throw',
```

This configuration means:

- **Build will FAIL** if any broken Markdown links are detected
- No additional plugins or tools needed
- Works automatically during `pnpm run build`

### What Gets Checked

Docusaurus checks:

- ✅ Internal document links (e.g., `[link](./other-doc.md)`)
- ✅ Links to other pages (e.g., `[link](/docs/intro)`)
- ✅ Links to assets (images, files)
- ✅ Anchor links within documents

### Example Error Output

When a broken link is found, the build fails with a detailed error:

```
Error: Docusaurus found broken links!

Please check the pages of your site in the list below, and make sure you don't reference any path that does not exist.

Exhaustive list of all broken links found:
- Broken link on source page path = /docs/projects/project-a-superapp/:
   -> linking to ./00-planning (resolved as: /docs/projects/project-a-superapp/00-planning)
   -> linking to ./10-mobile-app (resolved as: /docs/projects/project-a-superapp/10-mobile-app)
```

This tells you:

1. **Which page** has the broken link
2. **What link** is broken
3. **Where it tried to resolve** the link

## GitHub Actions Integration

The [docs-check.yml](file:///home/handiism/Developments/docs/.github/workflows/docs-check.yml) workflow leverages this feature:

```yaml
- name: Build documentation
  run: pnpm run build
```

If the build command finds broken links:

- ❌ The workflow fails
- 🚫 Pull requests cannot be merged
- 📧 Contributors are notified of the issue

## Best Practices

### 1. Always Link to Files, Not Folders

❌ **Incorrect:**

```markdown
[Planning](./00-planning)
```

✅ **Correct:**

```markdown
[Planning](./00-planning/index.md)
```

### 2. Use Relative Paths for Internal Links

✅ **Good:**

```markdown
[Other Doc](./other-doc.md)
[Parent Doc](../parent/doc.md)
```

### 3. Test Locally Before Pushing

```bash
pnpm run build
```

This will catch broken links before you commit.

### 4. Use Absolute Paths for Cross-Section Links

When linking between different project sections:

```markdown
[Backend Docs](/docs/projects/my-project/20-backend-core/index.md)
```

## Alternative Configurations

If you want different behavior, you can change `onBrokenLinks`:

```typescript
// Warn but don't fail the build
onBrokenLinks: 'warn',

// Ignore broken links (not recommended)
onBrokenLinks: 'ignore',

// Throw error (recommended - default)
onBrokenLinks: 'throw',
```

## Common Issues and Solutions

### Issue: Links to folders fail

**Problem:** `[Link](./folder)` doesn't work

**Solution:** Link to the index file: `[Link](./folder/index.md)`

### Issue: Links work locally but fail in CI

**Problem:** Case sensitivity differences between local and CI

**Solution:** Ensure exact case matching in file names and links

### Issue: Asset links broken

**Problem:** Images or files not found

**Solution:** Use absolute paths from `static/` folder:

```markdown
![Image](/img/my-image.png)
```

## Verification

To verify broken link detection is working:

1. **Create a broken link:**

   ```markdown
   [Broken](./non-existent-file.md)
   ```

2. **Run build:**

   ```bash
   pnpm run build
   ```

3. **Expected result:**

   ```
   Error: Docusaurus found broken links!
   ```

4. **Fix the link and rebuild:**

   ```bash
   pnpm run build
   ```

5. **Expected result:**
   ```
   [SUCCESS] Generated static files in "build".
   ```

## Summary

Docusaurus's native broken link detection:

- ✅ Requires zero configuration (already enabled)
- ✅ Works automatically during build
- ✅ Provides detailed error messages
- ✅ Integrates seamlessly with CI/CD
- ✅ Catches issues before deployment

This ensures your documentation always has valid links and provides a better experience for users.
