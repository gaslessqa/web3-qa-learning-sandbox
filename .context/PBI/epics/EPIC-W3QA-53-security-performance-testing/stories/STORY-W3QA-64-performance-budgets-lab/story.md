# STORY-W3QA-64: Performance Budgets Lab (Web Vitals + Web3 Latency)

## User Story
As a learner, I want to validate performance budgets for pages and Web3 operations, so UX remains fast and predictable.

## Context (Theory)
Performance in dApps is a combination of:
- classic web performance (Web Vitals: LCP, CLS, INP)
- Web3 operation latency:
  - read call latency (RPC)
  - gas estimation latency
  - time-to-wallet-prompt
  - time-to-receipt (confirmation UX)

QA should define budgets (targets) and validate regressions:
- "Docs pages load fast"
- "Gas estimation returns within X seconds on normal network"
- "Pending UX appears immediately after submission"

Budgets reduce subjective arguments and help CI enforce quality.

## Scope
- Define performance budgets:
  - Web Vitals budgets (MVP-appropriate)
  - Web3 operation budgets (read, estimateGas, tx status UI)
- Provide measurement methods:
  - Lighthouse / Web Vitals instrumentation
  - synthetic checks in Playwright (timings)
  - manual "how to measure" section
- Provide a CI-friendly "performance sanity check" approach (not full load testing).

## Acceptance Criteria
1. A budget table exists for:
   - at least 3 Web Vitals
   - at least 3 Web3 operation timings
2. Learner can measure and record baseline performance.
3. Learner can detect a regression and document evidence.
4. Automation guidance includes:
   - how to capture timings in Playwright
   - how to run Lighthouse (optional)
5. Includes an "interpretation" section:
   - what to do when budgets fail (triage steps)

## Out of Scope
- Full load testing and capacity planning.
- Production RUM dashboards setup (optional future).

## Done Criteria
- Learners can propose and enforce performance budgets in a QA Lead context.
