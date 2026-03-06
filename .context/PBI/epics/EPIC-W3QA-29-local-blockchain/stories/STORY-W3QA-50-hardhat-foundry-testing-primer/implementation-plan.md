# Implementation Plan — STORY-W3QA-50: Hardhat/Foundry Testing Primer

## Technical Approach
- Provide a docs page + a small set of example tests in the repo.
- Keep examples aligned with practice contracts used in labs.

## Tasks
1. Create `tests/` directory (or `test/`) with:
   - `practice.success.test.ts`
   - `practice.revert.test.ts`
   - `practice.events.test.ts`
2. Add docs explaining:
   - how to run tests
   - how to read failures
   - how to map test assertions to QA validations
3. Optional Foundry section:
   - add minimal commands and structure
   - keep clearly optional

## Notes
- The primary goal is comprehension for QA, not contract authoring mastery.
