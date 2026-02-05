# User Journeys: Web3 QA Learning Hub

## Journey 1: First-Time Learner - Connect Wallet & Complete First Lab

### Persona
**Maria** - The Web2 Veteran (transitioning to Web3)

### Scenario
Maria heard about the platform from a tweet. She wants to understand what "testing with a wallet" actually means. She has MetaMask installed but has never used it for testing purposes.

### Steps

#### Step 1: Landing & Discovery
| Aspect | Details |
|--------|---------|
| **User Action** | Visits homepage, reads value proposition |
| **System Response** | Shows clear messaging: "Learn Web3 QA by doing" with CTA to start |
| **Pain Point** | Might not understand what "wallet-first" means if jargon-heavy |

#### Step 2: Navigate to Beginner Docs
| Aspect | Details |
|--------|---------|
| **User Action** | Clicks "Start Learning" or navigates to Docs → Beginner |
| **System Response** | Shows sidebar with Beginner modules, first topic highlighted |
| **Pain Point** | Overwhelmed if too many options; needs clear "Start Here" |

#### Step 3: Read First Module
| Aspect | Details |
|--------|---------|
| **User Action** | Reads "What is Wallet Testing?" documentation |
| **System Response** | Renders MDX with highlighted code, embedded diagrams |
| **Pain Point** | Content too theoretical; wants to try something |

#### Step 4: Connect Wallet (Prompted)
| Aspect | Details |
|--------|---------|
| **User Action** | Clicks "Connect Wallet" button in navbar or inline prompt |
| **System Response** | RainbowKit modal opens, shows MetaMask option |
| **Pain Point** | Confusion if MetaMask not installed; needs fallback guidance |

#### Step 5: Approve Connection in MetaMask
| Aspect | Details |
|--------|---------|
| **User Action** | Clicks "Connect" in MetaMask popup |
| **System Response** | UI updates: shows truncated address, network indicator turns green |
| **Pain Point** | Popup blocked by browser; user doesn't see MetaMask prompt |

#### Step 6: Navigate to First Lab
| Aspect | Details |
|--------|---------|
| **User Action** | Clicks embedded "Try it yourself" link or Lab tab |
| **System Response** | Loads Lab page with practice contract pre-loaded |
| **Pain Point** | Lab requires wrong network; user sees error |

#### Step 7: Switch to Local Network (if needed)
| Aspect | Details |
|--------|---------|
| **User Action** | Clicks network switcher or follows prompt to switch to Hardhat |
| **System Response** | Triggers MetaMask network switch request |
| **Pain Point** | User hasn't set up Hardhat network in MetaMask |

#### Step 8: Execute First Read Operation
| Aspect | Details |
|--------|---------|
| **User Action** | Clicks "Read" button on a simple getter function |
| **System Response** | Shows result inline (e.g., contract owner address) |
| **Pain Point** | No feedback if RPC fails; user doesn't know what happened |

#### Step 9: Execute First Write Operation
| Aspect | Details |
|--------|---------|
| **User Action** | Fills input, clicks "Write" on a setter function |
| **System Response** | Shows gas estimate, then MetaMask popup for signing |
| **Pain Point** | Insufficient funds on local chain (forgot to get test ETH) |

#### Step 10: Observe Transaction Lifecycle
| Aspect | Details |
|--------|---------|
| **User Action** | Signs transaction in MetaMask |
| **System Response** | Shows pending → confirmed status, links to explorer |
| **Pain Point** | Transaction takes too long; user thinks it failed |

### Expected Outcome
Maria successfully connects her wallet, reads contract state, and submits her first transaction. She understands the basic flow of wallet-connected testing.

### Alternative Paths / Edge Cases

| Scenario | System Behavior |
|----------|-----------------|
| **MetaMask not installed** | Show "Install MetaMask" link with setup instructions |
| **User rejects connection** | Show message: "Connection cancelled. Click Connect to try again." |
| **Wrong network** | Show network mismatch banner with switch button |
| **Transaction rejected** | Show clear error: "Transaction cancelled by user" |
| **Transaction reverts** | Show revert reason if available, link to troubleshooting |

---

## Journey 2: Lab Practice - Transaction Lifecycle Exploration

### Persona
**Alex** - The Junior Web3 QA (deepening skills)

### Scenario
Alex uses the platform during work hours to understand why some transactions fail. He wants to deliberately trigger edge cases and observe the results.

### Steps

#### Step 1: Access Intermediate Lab
| Aspect | Details |
|--------|---------|
| **User Action** | Navigates directly to Labs → Intermediate → Transaction Testing |
| **System Response** | Loads lab with transaction-focused practice contract |
| **Pain Point** | Wallet disconnected from previous session; needs to reconnect |

#### Step 2: Review Lab Objective
| Aspect | Details |
|--------|---------|
| **User Action** | Reads lab description: "Test transaction states and error handling" |
| **System Response** | Shows learning objectives, required setup (local chain) |
| **Pain Point** | Local Hardhat node not running; lab functions fail silently |

#### Step 3: Trigger Successful Transaction
| Aspect | Details |
|--------|---------|
| **User Action** | Calls a simple state-changing function with valid inputs |
| **System Response** | Transaction succeeds; shows confirmed status + event logs |
| **Pain Point** | None (happy path) |

#### Step 4: Trigger Revert (Intentional)
| Aspect | Details |
|--------|---------|
| **User Action** | Calls function with invalid input to trigger require() failure |
| **System Response** | MetaMask shows error before signing OR tx reverts with reason |
| **Pain Point** | Revert reason not shown clearly; user doesn't understand failure |

#### Step 5: Trigger Gas Estimation Failure
| Aspect | Details |
|--------|---------|
| **User Action** | Calls function that will always revert (tests gas estimation) |
| **System Response** | Shows "Gas estimation failed" with explanation |
| **Pain Point** | Error message too technical; needs QA-friendly explanation |

#### Step 6: Observe Event Emission
| Aspect | Details |
|--------|---------|
| **User Action** | Triggers function that emits event, watches Event Monitor |
| **System Response** | Real-time event appears in monitor with decoded parameters |
| **Pain Point** | Events not appearing if polling is slow |

#### Step 7: Inspect Transaction Details
| Aspect | Details |
|--------|---------|
| **User Action** | Clicks on transaction hash to see details |
| **System Response** | Shows: status, block, gas used, logs, input data |
| **Pain Point** | Information overload; user doesn't know what matters for QA |

### Expected Outcome
Alex understands how to trigger and observe different transaction states (success, revert, estimation failure) and can explain these to developers.

### Alternative Paths / Edge Cases

| Scenario | System Behavior |
|----------|-----------------|
| **Hardhat node not running** | Show error: "Cannot connect to local network. Is Hardhat running?" |
| **Account has no ETH** | Show warning before tx: "Insufficient funds. Get test ETH." |
| **Network congestion (testnet)** | Show pending state with explanation of mempool |
| **MetaMask locked** | Prompt to unlock wallet |

---

## Journey 3: Team Onboarding - Manager Shares Learning Path

### Persona
**David** - The Team Lead (enabling team)

### Scenario
David just hired a new QA engineer with Web2 background. He wants to assign a structured learning path and check in on progress periodically.

### Steps

#### Step 1: Review Platform Content
| Aspect | Details |
|--------|---------|
| **User Action** | Browses documentation structure to assess quality |
| **System Response** | Shows clear hierarchy: Beginner → Intermediate → Expert |
| **Pain Point** | No way to see estimated time per module |

#### Step 2: Create Learning Plan (External)
| Aspect | Details |
|--------|---------|
| **User Action** | Copies module links into internal wiki/onboarding doc |
| **System Response** | URLs are shareable and direct-linkable |
| **Pain Point** | No built-in "learning path" feature to share (MVP limitation) |

#### Step 3: Share with New Hire
| Aspect | Details |
|--------|---------|
| **User Action** | Sends links to new team member via Slack/email |
| **System Response** | Links work; new hire can access immediately |
| **Pain Point** | Can't track if new hire actually completed modules |

#### Step 4: New Hire Completes Modules
| Aspect | Details |
|--------|---------|
| **User Action** | New hire works through Beginner content and labs |
| **System Response** | No progress tracking in MVP (public, no auth) |
| **Pain Point** | David has to ask manually; no visibility |

#### Step 5: Check-In Meeting
| Aspect | Details |
|--------|---------|
| **User Action** | David asks new hire to demonstrate a lab exercise |
| **System Response** | New hire can screen-share and show wallet interactions |
| **Pain Point** | No portfolio/completion proof (MVP limitation) |

### Expected Outcome
David successfully onboards a new team member using the platform as primary training material, reducing 1:1 teaching time.

### Alternative Paths / Edge Cases

| Scenario | System Behavior |
|----------|-----------------|
| **New hire has no MetaMask** | Setup guide in Beginner docs covers installation |
| **Company blocks browser extensions** | Document alternative: use personal device or request exception |
| **New hire gets stuck** | Discord community available for questions |
| **Content outdated** | GitHub issues for feedback; David can report problems |

---

## Journey Summary

| Journey | Persona | Primary Goal | Key Pain Points to Address |
|---------|---------|--------------|---------------------------|
| First-Time Learner | Maria | Connect wallet, complete first lab | Clear onboarding, error handling, network guidance |
| Lab Practice | Alex | Explore transaction edge cases | Revert explanations, event visibility, QA context |
| Team Onboarding | David | Assign structured learning path | Shareability, (future: progress tracking) |

---

## Edge Case Matrix

| Edge Case | Affected Journeys | Mitigation |
|-----------|-------------------|------------|
| MetaMask not installed | All | Clear install instructions with links |
| Wrong network selected | Journey 1, 2 | Network mismatch banner + one-click switch |
| Wallet locked/disconnected | All | Reconnect prompt in UI |
| Transaction rejected by user | Journey 1, 2 | Friendly "cancelled" message |
| Transaction reverts on-chain | Journey 2 | Show revert reason with QA explanation |
| RPC/network unavailable | All | Error state with troubleshooting steps |
| Local Hardhat not running | Journey 2 | Detection + setup reminder |
| Browser blocks popups | Journey 1 | Guidance to allow popups for MetaMask |
