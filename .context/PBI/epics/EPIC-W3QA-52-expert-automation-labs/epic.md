# EPIC-W3QA-52: Expert Automation Labs (Playwright + Synpress)

## Summary
Build an expert-level automation track tailored to Web3 dApps:
- A scalable Playwright framework baseline for UI testing
- A minimal, reliable MetaMask E2E suite using Synpress
- A wallet-matrix harness to reuse the same scenarios across wallet providers
- Cross-browser + responsive matrix runs in CI
- CI/CD integration with GitHub Actions, reports, and artifacts
- Flaky test control policies and tooling
- API smoke suite for platform endpoints/utilities

## Goals
- Teach how to build automation that is realistic for Web3 (wallet prompts, async tx states, RPC variability).
- Provide production-grade patterns: fixtures, POM/components, stable selectors, tracing, and reporting.
- Integrate tests into CI/CD with quality gates and artifact-based debugging.

## Non-Goals
- Full mobile device automation for WalletConnect (covered in EPIC-W3QA-54).
- Hardware wallet automation (covered as checklist-based testing).
- A "100% E2E everything" approach (not recommended for Web3).

## In Scope (Stories)
- W3QA-55 Playwright Framework Bootstrap for dApps
- W3QA-56 MetaMask E2E (Synpress): Connect/Disconnect + Account/Chain events
- W3QA-57 Wallet Matrix Automation Harness
- W3QA-58 Cross-Browser + Cross-Viewport Test Matrix in CI
- W3QA-59 CI/CD Integration: GitHub Actions + Reports + Artifacts
- W3QA-60 Flaky Test Control (Retries, Quarantine, Tracing)
- W3QA-61 API Smoke Suite (Platform endpoints)

## Key Concepts (Theory for Learners)
- Web3 E2E is fragile: keep the MetaMask suite small (smoke) and rely on mocks/contract-level tests for coverage.
- Prefer deterministic environments: local chain + known contracts + seeded state.
- Use trace/video/screenshots as first-class debugging artifacts.
- Wallet + chain changes are the top sources of "stale UI" defects—test them explicitly.

## Dependencies
- EPIC-W3QA-6 Wallet Connectivity
- EPIC-W3QA-18 Labs + EPIC-W3QA-24 Monitoring
- EPIC-W3QA-29 Local Blockchain (recommended for deterministic E2E)
- Documentation framework (EPIC-W3QA-12) to publish automation lessons

## Definition of Done (Epic)
- A learner can run:
  - Playwright UI suite locally
  - A minimal Synpress MetaMask smoke suite locally (and optionally in CI)
  - CI pipeline with HTML report + artifacts
- A repeatable pattern exists for adding new tests with stable selectors and fixtures.
