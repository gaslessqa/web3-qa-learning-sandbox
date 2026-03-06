# STORY-W3QA-62: dApp Threat Modeling for QA (Wallet + RPC + UI)

## User Story
As a QA engineer, I want a threat-modeling checklist for dApps (wallet + RPC + UI), so I can design security-minded tests.

## Context (Theory)
Threat modeling is a structured way to answer:
- What can go wrong?
- How would it show up in the product?
- What tests reduce the risk?

For dApps, the most common security-impacting QA areas include:
- Wallet prompts and user consent (connect, sign, approve)
- Network correctness (wrong chain, malicious RPC, stale data)
- Transaction safety UX (clear recipient, amounts, slippage, deadlines)
- Permissions and approvals (allowance, revoke, "max approve" warnings)
- Dependency integrity (RPC providers, third-party widgets, analytics)

This track teaches QA to identify risks and test for safe UX defaults—not to exploit systems.

## Scope
- Provide a threat model checklist structured by surfaces:
  1) Wallet & signing UX
  2) Network & chain correctness
  3) Transactions & approvals
  4) RPC/dependency resilience
  5) Data integrity & UI state safety
- Provide a "Risk → Tests → Evidence" mapping template.
- Provide example threats and how QA would validate mitigations.

## Acceptance Criteria
1. Checklist covers at least 25 actionable checks across the five surfaces.
2. Each check includes:
   - what to verify
   - expected safe behavior
   - what evidence to capture (screenshots, tx hash, logs)
3. Includes guidance on severity and user impact classification.
4. Includes a short "what QA is NOT doing" section (not an audit).

## Out of Scope
- Writing exploits or bypass steps.
- Smart contract vulnerability deep dives beyond QA validation signals.

## Done Criteria
- Learners can produce a threat-model-based test plan for a dApp feature (wallet connect, approve, swap) and defend it in an interview.
