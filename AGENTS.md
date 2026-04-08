# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

---

## Project Overview

This is an **AI-Driven Software Development Framework** that implements a 14-phase methodology for building software with context engineering and spec-driven development. The repository serves as both a template/starter kit and a comprehensive guide for AI-assisted development workflows.

**Key Concepts:**

- **Context Engineering**: Documentation structure designed for AI to read and understand project context
- **Spec-Driven Development (SDD)**: All implementation flows from specifications (User Stories → Test Cases → Implementation Plans)
- **KATA Framework**: Test automation architecture (Komponent Action Test Architecture) for structured E2E and API testing
- **14-Phase Methodology**: Structured workflow from business constitution through production deployment

---

## Common Commands

### Package Management & Execution

```powershell
# This project uses Bun as the JavaScript runtime
bun install              # Install dependencies
bun run <script>         # Run package.json scripts
```

### Code Quality & Linting

```powershell
bun run format           # Format all files with Prettier
bun run format:check     # Check formatting without modifying
bun run lint             # Run ESLint on codebase
bun run lint:fix         # Run ESLint with auto-fix
```

### Utility Scripts

```powershell
bun run ai               # Run MCP builder (scripts/mcp-builder.js)
bun run up               # Update prompts (scripts/update-prompts.js)
bun run kata:manifest    # Generate KATA component catalog
bun run api:sync         # Sync OpenAPI specifications
bun run email:check      # Validate email configurations
bun run xray             # Xray test management integration
```

### Git Workflow

The project uses Husky for pre-commit hooks that automatically run:

- ESLint with auto-fix on staged `.ts`, `.tsx`, `.js`, `.jsx` files
- Prettier formatting on all staged files

---

## Project Structure & Architecture

### High-Level Directory Organization

```
Web3QALearningHub/
├── .context/              # AI-readable documentation (Context Engineering)
│   ├── system-prompt.md   # Copy to CLAUDE.md/GEMINI.md for AI configuration
│   ├── idea/             # Phase 1: Business constitution
│   ├── PRD/              # Phase 2: Product Requirements
│   ├── SRS/              # Phase 2: Software Requirements
│   ├── PBI/              # Phases 4-6: Product Backlog Items (Epics/Stories)
│   └── guidelines/       # Development standards by role
│       ├── DEV/          # Development guidelines
│       ├── QA/           # QA testing guidelines
│       ├── TAE/          # Test Automation Engineering (KATA)
│       └── MCP/          # Model Context Protocol guidelines
│
├── .prompts/             # Reusable prompts for generating .context/ docs
│   ├── fase-1-constitution/
│   ├── fase-2-architecture/
│   ├── fase-4-specification/
│   ├── fase-7-implementation/
│   ├── fase-12-test-automation/
│   ├── us-dev-workflow.md     # Complete dev workflow (Phases 6-9)
│   └── us-qa-workflow.md      # Complete QA workflow (Phases 10-12)
│
├── docs/                 # Master documentation
│   ├── ai-driven-software-project-blueprint.md  # 14-phase methodology
│   ├── kata-test-architecture.md                # KATA framework details
│   └── mcp-*.md          # MCP configuration guides
│
├── scripts/              # Utility scripts
│   ├── mcp-builder.js    # Load MCPs by task (backend/frontend/uitest)
│   ├── kata-manifest.ts  # Generate test component catalog
│   ├── sync-openapi.ts   # Sync API specs
│   └── xray.ts           # Xray test management
│
└── templates/            # Configuration templates (MCP catalogs)
```

### Critical Architecture Concepts

**Context Engineering Layers:**

- `.context/` = What AI reads to understand the project
- `.prompts/` = How to generate documentation in `.context/`
- `docs/` = Reference blueprints and methodology

**Product Backlog Structure (PBI):**

```
.context/PBI/epics/EPIC-{PROJECT}-{NUM}-{name}/
├── epic.md                          # Epic definition
├── feature-test-plan.md            # Test strategy
├── feature-implementation-plan.md  # Technical approach
└── stories/STORY-{PROJECT}-{NUM}-{name}/
    ├── story.md                    # User story + acceptance criteria
    ├── test-cases.md               # Test cases to validate
    └── implementation-plan.md      # Step-by-step tech plan
```

**Naming Convention:** Always use real Jira IDs (e.g., `EPIC-MYM-13-mentor-discovery`), obtained via Jira-First workflow with Atlassian MCP.

---

## Development Workflow & Guidelines

### Spec-Driven Development Principle

**NEVER implement code without reading specifications first:**

1. **Read the User Story** (`.context/PBI/.../story.md`) → Defines WHAT to build
2. **Read Test Cases** (`.context/PBI/.../test-cases.md`) → Defines HOW to validate
3. **Read Implementation Plan** (`.context/PBI/.../implementation-plan.md`) → Defines HOW to build
4. **Read Development Guidelines** (`.context/guidelines/DEV/`) → Standards to follow

### Code Standards (from `.context/guidelines/DEV/code-standards.md`)

**TypeScript Strict Mode:**

- Always use `strict: true` in tsconfig
- Avoid `any` types - define explicit interfaces
- No implicit returns - be explicit

**Naming Conventions:**

- Variables/functions: `camelCase`
- Components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `kebab-case.ts` or `PascalCase.tsx` (components)
- Types/Interfaces: `PascalCase`

**DRY, KISS, YAGNI:**

- Don't Repeat Yourself - extract reusable functions
- Keep It Simple - avoid over-engineering
- You Aren't Gonna Need It - don't add unused features

### Error Handling Standards

**NEVER hardcode error messages or values:**

```typescript
// ❌ BAD
throw new Error('User not found');

// ✅ GOOD
class UserNotFoundError extends AppError {
  constructor(userId: string) {
    super(`User with ID ${userId} not found`, 404);
  }
}
```

**Use custom error classes** (see `.context/guidelines/DEV/error-handling.md`)

---

## Test Automation - KATA Framework

### KATA Architecture Overview

**KATA** (Komponent Action Test Architecture) is a 3-layer test framework:

1. **Komponents (Components):** Page Objects (UI) or API wrappers that contain ATCs
2. **Actions (ATCs):** Acceptance Test Cases - atomic, reusable test methods decorated with `@atc('JIRA-ID')`
3. **Tests:** Orchestrate ATCs to validate complete user journeys

### Key KATA Concepts

**ATC (Acceptance Test Case):**

- Maps 1:1 with Jira test case ID
- Decorated with `@atc('PROJECT-XXX')`
- Contains assertions - validates the flow worked
- Returns data for chaining (API) or void (UI)

**Directory Structure:**

```
/tests
├── /components
│   ├── TestContext.ts       # Global utilities (config, logger, faker)
│   ├── TestFixture.ts       # Dependency Injection entry point
│   ├── /api
│   │   ├── ApiBase.ts      # REST helpers with type-safe generics
│   │   └── AuthApi.ts      # Specific API component with ATCs
│   ├── /ui
│   │   ├── UiBase.ts       # Playwright wrappers
│   │   └── LoginPage.ts    # Page Object with ATCs
│   └── /preconditions
│       └── AuthFlows.ts    # Reusable ATC chains
│
├── /integration             # API tests
├── /e2e                     # UI + API tests
└── /utils
    ├── decorators.ts        # @atc decorator (TC39 Stage 3)
    └── KataReporter.ts      # Custom terminal reporter
```

**Import Aliases (Mandatory):**

```typescript
// ✅ CORRECT - Always use aliases
import { config } from '@config/variables';
import { ApiBase } from '@components/api/ApiBase';
import { atc } from '@utils/decorators';

// ❌ WRONG - No relative imports
import { config } from '../../../config/variables';
```

### Implementing Test Automation

**Before writing tests:**

1. Read `.context/guidelines/TAE/KATA-AI-GUIDE.md` (AI entry point)
2. Read test cases from `.context/PBI/.../test-cases.md`
3. Follow prompts in `.prompts/fase-12-test-automation/`
4. Run `bun run kata:manifest` to see existing components

**Test Implementation Flow:**

- Phase 10: Manual exploratory testing (validate functionality first)
- Phase 11: Document tests in Jira with priorities
- Phase 12: Automate validated tests using KATA framework

---

## MCP (Model Context Protocol) Usage

### When to Use MCPs

**MCPs provide LIVE data, not static documentation:**

| MCP        | Use For                               |
| ---------- | ------------------------------------- |
| Supabase   | Database schema, policies, migrations |
| Context7   | Official library documentation        |
| Atlassian  | Jira issues, stories, test management |
| Playwright | UI testing, E2E interactions          |
| Postman    | API testing with collections          |
| OpenAPI    | API testing via specification         |
| DBHub      | SQL queries, data verification        |
| GitHub     | Repository, PRs, issues               |

### MCP Loading Strategy

Use the MCP builder to load only what's needed:

```powershell
bun run ai backend   # Loads: supabase + context7
bun run ai frontend  # Loads: context7 + playwright
bun run ai uitest    # Loads: playwright + devtools + context7
```

See `docs/mcp-builder-strategy.md` for token optimization details.

---

## 14-Phase Methodology

### Synchronous Phases (One-time setup)

1. **Constitution** - Business model, market analysis
2. **Architecture** - PRD (product) + SRS (technical specs)
3. **Infrastructure** - Backend + frontend base setup

### Asynchronous Phases (Per sprint/story)

4. **Specification** - Create epics/stories in PBI (Jira-First workflow)
5. **Shift-Left Testing** - Write test plans and test cases
6. **Planning** - Create implementation plans
7. **Implementation** - Code + unit tests (read `.context/guidelines/DEV/`)
8. **Code Review** - Static analysis (ESLint/Prettier already configured)
9. **Deployment Staging** - CI/CD to staging environment
10. **Exploratory Testing** - Manual QA validation
11. **Test Documentation** - Document tests in Jira
12. **Test Automation** - Automate with KATA framework
13. **Production Deployment** - Deploy to production
14. **Shift-Right Testing** - Monitoring and observability

### Key Ordering Rules

**Backend before Frontend** (Phase 3):

- Backend defines schemas → generates TypeScript types
- Frontend imports shared types → zero type errors

**Manual before Automated** (Phases 10-12):

- Exploratory testing validates functionality (5-30 min)
- Only automate what's already validated manually
- Prevents wasting time automating broken features

**Unit tests in Development** (Phase 7):

- Unit tests are part of implementation
- Integration/E2E tests come later (Phase 12)

---

## Important Notes for AI Agents

### Critical Guidelines to Follow

**When implementing features:**

1. Read `.context/guidelines/DEV/spec-driven-development.md` first
2. Never hardcode values - use configuration from `@config/variables`
3. Add `data-testid` attributes to interactive elements (see `.context/guidelines/DEV/data-testid-standards.md`)
4. Follow TypeScript strict mode - no `any` types
5. Use custom error classes for error handling

**When creating tests:**

1. Read `.context/guidelines/TAE/KATA-AI-GUIDE.md` for orientation
2. All tests must use KATA architecture (Components → ATCs → Tests)
3. Every ATC must have `@atc('PROJECT-XXX')` decorator with real Jira ID
4. Use import aliases (`@config`, `@components`, `@utils`) - no relative imports
5. Tests inherit from fixtures (TestFixture, ApiFixture, UiFixture)

**Jira-First Workflow:**

- Always create epic/story in Jira first (using Atlassian MCP)
- Obtain real Jira ID (e.g., `PROJECT-123`)
- Create local folder with real ID: `EPIC-PROJECT-123-descriptive-name/`
- Never invent or mock IDs

**Documentation vs Prompts:**

- `.context/` = AI reads this to work
- `.prompts/` = AI uses these to generate `.context/` files
- `docs/` = Reference material (methodology, architecture)

### System Prompt Configuration

Copy `.context/system-prompt.md` to your AI configuration file:

- Claude Code: `./CLAUDE.md` (in root)
- Gemini CLI: `.gemini/gemini.md`
- GitHub Copilot: `.github/copilot-instructions.md`
- Cursor: `.cursor/rules`

This configures the AI with context loading strategies and role-specific guidelines.

---

## Quick Reference by Role

**As a Developer (DEV):**

- Read: `.context/guidelines/DEV/` before coding
- Follow: Spec-Driven Development principle
- Use: `bun run lint:fix` and `bun run format` before commit
- MCPs: Supabase (schema), Context7 (docs), GitHub (code)

**As QA Engineer:**

- Read: `.context/guidelines/QA/` before testing
- Use: Playwright MCP for UI, Postman/OpenAPI for API, DBHub for DB
- Document: Test results in Jira via Atlassian MCP
- Follow: Trifuerza testing (UI + API + DB layers)

**As Test Automation Engineer (TAE):**

- Read: `.context/guidelines/TAE/KATA-AI-GUIDE.md` first
- Follow: KATA architecture strictly
- Use: `bun run kata:manifest` to see existing components
- Prompts: `.prompts/fase-12-test-automation/`
- MCPs: Playwright, DevTools, Context7, Atlassian

---

**Last Updated:** 2026-03-26

<!-- VERCEL BEST PRACTICES START -->

## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->
