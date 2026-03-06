# Test Cases — STORY-W3QA-32: Setup Documentation

## Manual Test Cases

### TC-W3QA-32-001 — First-run checklist completeness
**Steps**
1. Follow setup docs from scratch on a clean machine/profile.

**Expected**
- All commands are present and in correct order
- No missing steps required to run a lab

### TC-W3QA-32-002 — Troubleshooting coverage
**Steps**
1. Trigger common failure (e.g., wrong Node.js version, port in use, missing env var).
2. Use troubleshooting section.

**Expected**
- User can identify issue and fix without external help
- Guidance is actionable (clear commands)

### TC-W3QA-32-003 — Wallet local chain instructions
**Steps**
1. Follow the wallet config steps for local network.

**Expected**
- User can add local network or switch to it
- User can connect wallet to the app on local chain

## Automation Candidates
- None required (docs quality is primarily manual)
- Optional: lint checks for code blocks and links (CI)
