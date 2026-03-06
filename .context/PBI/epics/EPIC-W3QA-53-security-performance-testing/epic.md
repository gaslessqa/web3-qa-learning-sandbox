# EPIC-W3QA-53: Security & Performance Testing for dApps

## Summary
Deliver an advanced QA track focused on two areas that commonly break Web3 products in production:
1) Security-minded QA (threat modeling + validation checklists)
2) Performance & resilience (Web Vitals + Web3/RPC latency and failure modes)

This epic is not a smart contract audit course. It teaches QA engineers how to:
- design tests that reduce risk,
- validate predictable UX under degraded conditions,
- and produce evidence-rich bug reports.

## Goals
- Provide a practical threat-modeling checklist specifically for dApps (wallet + RPC + UI + contracts).
- Teach RPC failure-mode testing (timeouts, rate limits, retries, "pending forever").
- Define and validate performance budgets (web vitals + Web3 operations latency).
- Include manual QA checklists + automation guidance for each topic.

## Non-Goals
- Full penetration testing or exploit development.
- Smart contract auditing beyond "symptoms and safety checks".
- Load testing at production scale (this epic covers budgets and sanity checks only).

## In Scope (Stories)
- W3QA-62 dApp Threat Modeling for QA (Wallet + RPC + UI)
- W3QA-63 RPC Failure Mode Lab (Timeouts, Rate Limits, Retries)
- W3QA-64 Performance Budgets Lab (Web Vitals + Web3 Latency)

## Key Concepts (Theory for Learners)
- A dApp's risk surface is broader than a classic web app:
  - Wallet prompts, signatures, approvals
  - RPC/network reliability
  - On-chain irreversibility + async execution
- QA can reduce risk by:
  - validating safe UX defaults and clear warnings
  - enforcing "evidence-based correctness" (receipts/logs)
  - ensuring graceful degradation (retries, fallbacks, clear errors)
- Performance is not just page speed:
  - on-chain reads, gas estimation latency, wallet prompt time, confirmation UX

## Dependencies
- EPIC-W3QA-6 Wallet Connectivity (wallet states)
- EPIC-W3QA-18 Labs (read/write/gas)
- EPIC-W3QA-24 Monitoring (tx status, receipts, logs)
- EPIC-W3QA-29 Local chain (deterministic environment recommended)
- Docs framework (EPIC-W3QA-12)

## Risks
- Confusing "security" content with "audit" expectations
- Labs becoming non-deterministic if they rely on public RPCs
- Over-engineering performance without actionable thresholds

## Definition of Done (Epic)
- All 3 stories published as docs pages using the lesson template:
  - Theory → QA Checklist → Manual Steps → Automation → Observability → Reporting
- Includes copy/paste artifacts:
  - threat model checklist template
  - RPC failure playbook
  - performance budget table
- Optional: demo toggles or test harness patterns to simulate failures deterministically
