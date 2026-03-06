# Implementation Plan — STORY-W3QA-59: GitHub Actions Integration

## Technical Approach
- Use a workflow that:
  - installs dependencies with caching
  - builds the app
  - runs Playwright
  - uploads artifacts

## Tasks
1. Create `.github/workflows/tests.yml`
2. Steps:
   - checkout
   - setup node
   - install deps (cache)
   - build
   - start server (background)
   - run tests
   - upload artifacts (report + traces)
3. Add env config for CI base URL and ports.
4. Document:
   - where to find artifacts
   - common CI failures (port in use, timeout, missing deps)
