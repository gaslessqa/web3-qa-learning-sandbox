# STORY-W3QA-46: Mentoring Playbook + Automation Review Checklist

## User Story
As a QA Lead, I want a mentoring playbook and review checklist, so the team scales automation without flaky instability.

## Context (Theory for Learners)
Growing a QA team requires more than hiring — it requires structured onboarding and code quality gates:
- New QAs need a clear learning path with measurable milestones
- Automated test PRs need consistent review standards
- Flaky tests erode trust and slow CI — they need a policy, not just tolerance
- Web3 adds complexity: async wallet flows, nondeterministic tx timing, network switching — all common sources of flakiness

## Scope
- Mentoring guidelines for onboarding QAs into Web3 automation
- PR review checklist for automated tests (selectors, waits, determinism, artifacts)
- Flaky test policy and quarantine rules
- Examples of good vs. bad test patterns (Web3 context)

## Acceptance Criteria
1. Review checklist covers selectors, waits, determinism, and artifact collection.
2. Mentoring plan includes a structured "first 2 weeks" onboarding path.
3. Includes concrete examples of flaky causes and fixes in Web3 automation.

## Done Criteria
- QA Lead can use the playbook to onboard a new automation engineer and enforce quality standards on test PRs.
