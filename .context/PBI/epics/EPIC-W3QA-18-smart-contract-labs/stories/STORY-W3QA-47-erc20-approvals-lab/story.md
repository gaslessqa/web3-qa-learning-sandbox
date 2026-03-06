# STORY-W3QA-47: ERC-20 Approvals & Allowance QA Lab

## User Story
As a learner, I want an ERC-20 approvals & allowance lab so that I can test the most common DeFi permission pattern.

## Context (Theory for Learners)
Most DeFi apps require the user to grant permission to a contract to move tokens on their behalf:
- `approve(spender, amount)` sets an allowance
- later, the spender contract can call `transferFrom`

This pattern introduces common QA and security risks:
- forgetting to approve or insufficient allowance
- infinite approval (UX + risk)
- revoking allowance (approve to 0)
- decimals formatting issues

## Scope
- Provide a practice ERC-20 token + a "spender" contract in local chain
- UI flow:
  1) check balance and allowance
  2) approve amount (finite or max)
  3) validate allowance updated
  4) simulate a `transferFrom` usage to see allowance decrease
  5) revoke (approve 0)
- Teach QA checklist and expected failure modes

## Acceptance Criteria
1. Learner can view token balance and current allowance.
2. Learner can approve a finite amount and see allowance updated.
3. Learner can approve "max allowance" and see a clear warning/explanation.
4. Learner can revoke allowance (set to 0) and confirm it on-chain.
5. Common error cases are testable and clearly explained (insufficient allowance, user rejects, revert).

## Dependencies
- Local practice contracts (ERC-20 + spender)
- Write + read functions labs (W3QA-20..23)

## Done Criteria
- Learner can explain and test the approve → allowance → transferFrom lifecycle end-to-end
