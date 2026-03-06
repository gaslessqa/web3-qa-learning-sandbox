# Implementation Plan — STORY-W3QA-64: Performance Budgets Lab

## Suggested Pages
- `/docs/expert/performance/performance-budgets-for-dapps.md`
- `/docs/expert/performance/web-vitals-basics.md`
- `/docs/expert/performance/web3-latency-budgets.md`

## Artifacts
- Performance budget table template (markdown)
- Weekly performance report template (markdown)

## Optional Implementation Enhancements (If you want in-product measurement)
- Add lightweight Web Vitals instrumentation (client-side) in dev mode:
  - log LCP/CLS/INP to console or a dev panel
- Add "operation timers" around:
  - read calls
  - gas estimation
  - tx submission → pending UI
  - tx pending → receipt

## Automation Examples (Docs)
- Playwright timings:
  - `performance.timing` / `PerformanceObserver` patterns
  - measuring a "loading to visible" milestone using stable selectors
- Optional Lighthouse CI workflow (advanced, optional)
