# Functional Specifications: Web3 QA Learning Hub

## Overview

This document maps each User Story from the PRD to detailed Functional Requirements (FRs). Each FR specifies inputs, processing logic, outputs, and validations.

---

## EPIC-W3QA-01: Platform Foundation

### FR-001: Responsive Web Interface

**The system must render a responsive web interface accessible from desktop, tablet, and mobile devices.**

- **Related to:** EPIC-W3QA-01, US-1.1
- **Input:**
  - HTTP request to platform URL
  - User agent string (browser/device info)
- **Processing:**
  - Detect viewport size via CSS media queries
  - Load appropriate layout (desktop/tablet/mobile)
  - Apply Tailwind CSS responsive classes
- **Output:**
  - Rendered page with correct layout for device
  - Navigation adapted to screen size (hamburger menu on mobile)
- **Validations:**
  - Minimum viewport: 320px width
  - Maximum viewport: 2560px width

---

### FR-002: Navigation Between Docs and Labs

**The system must provide seamless navigation between documentation and lab sections.**

- **Related to:** EPIC-W3QA-01, US-1.2
- **Input:**
  - User click on navigation link (Docs/Labs)
  - Current page URL
- **Processing:**
  - Next.js App Router handles client-side navigation
  - Preserve wallet connection state during navigation
  - Pre-fetch linked pages for instant transitions
- **Output:**
  - Target page renders without full page reload
  - Wallet state persists in global context
  - URL updates to reflect new route
- **Validations:**
  - Navigation completes in < 300ms (client-side)
  - No wallet disconnection during navigation

---

### FR-003: Wallet State Persistence Across Pages

**The system must maintain wallet connection state across all page navigations.**

- **Related to:** EPIC-W3QA-01, US-1.3
- **Input:**
  - Wallet connection established via wagmi
  - Page navigation event
- **Processing:**
  - Store wallet state in wagmi context (React Context)
  - Context wraps entire application in root layout
  - State survives client-side navigation
- **Output:**
  - Connected wallet address visible on all pages
  - Network information persists
  - No reconnection prompts during session
- **Validations:**
  - State persists for entire browser session
  - State clears on explicit disconnect or browser close

---

### FR-004: Navbar Wallet Status Display

**The system must display current wallet connection status and network in the navbar.**

- **Related to:** EPIC-W3QA-01, US-1.4
- **Input:**
  - Wallet connection state from wagmi
  - Current chain ID from provider
- **Processing:**
  - Subscribe to wagmi account and chain hooks
  - Format address as truncated (0x1234...5678)
  - Map chain ID to network name and color
- **Output:**
  - Truncated address displayed (or "Connect" button if disconnected)
  - Network badge with name and color indicator
  - Visual distinction for supported vs unsupported networks
- **Validations:**
  - Address format: `0x[4 chars]...[4 chars]`
  - Network names from predefined list (Ethereum, Sepolia, Hardhat, etc.)

---

## EPIC-W3QA-02: Wallet Connectivity

### FR-005: MetaMask Wallet Connection

**The system must allow users to connect their MetaMask wallet.**

- **Related to:** EPIC-W3QA-02, US-2.1
- **Input:**
  - User clicks "Connect Wallet" button
  - MetaMask extension installed in browser
- **Processing:**
  - RainbowKit modal opens with wallet options
  - User selects MetaMask
  - `eth_requestAccounts` RPC call to MetaMask
  - MetaMask popup requests user approval
  - On approval, wagmi stores account in state
- **Output:**
  - Success: Account address stored, UI updates to show connected state
  - Failure: Error message if user rejects or MetaMask unavailable
- **Validations:**
  - Valid Ethereum address returned (0x + 40 hex chars)
  - MetaMask extension detected before showing option

---

### FR-006: WalletConnect Connection

**The system must allow users to connect via WalletConnect for mobile wallets.**

- **Related to:** EPIC-W3QA-02, US-2.2
- **Input:**
  - User clicks "Connect Wallet" → selects WalletConnect
  - WalletConnect project ID configured
- **Processing:**
  - Generate WalletConnect pairing URI
  - Display QR code in modal
  - User scans with mobile wallet
  - WebSocket connection established
  - Account address received via WalletConnect protocol
- **Output:**
  - Success: Mobile wallet connected, address displayed
  - Failure: Timeout error if QR not scanned within 60s
- **Validations:**
  - WalletConnect v2 protocol
  - Valid pairing URI format

---

### FR-007: Connected Address Display

**The system must display the connected wallet address in truncated format.**

- **Related to:** EPIC-W3QA-02, US-2.3
- **Input:**
  - Full Ethereum address from wagmi (42 characters)
- **Processing:**
  - Extract first 6 characters (0x + 4)
  - Extract last 4 characters
  - Concatenate with ellipsis
- **Output:**
  - Displayed format: `0x1234...5678`
  - Full address available on hover/click (tooltip or copy)
- **Validations:**
  - Always 13 characters displayed
  - Clickable to copy full address

---

### FR-008: Wallet Disconnect

**The system must allow users to disconnect their wallet and clear session state.**

- **Related to:** EPIC-W3QA-02, US-2.4
- **Input:**
  - User clicks "Disconnect" button (from dropdown or modal)
- **Processing:**
  - Call wagmi `disconnect()` function
  - Clear wallet state from context
  - Clear any cached session data
  - Reset UI to disconnected state
- **Output:**
  - Navbar shows "Connect Wallet" button
  - No account or network information displayed
  - Labs show "Connect wallet to continue" prompt
- **Validations:**
  - All wallet-related state cleared
  - No stale data after disconnect

---

### FR-009: Network Switching

**The system must allow users to switch networks from the platform UI.**

- **Related to:** EPIC-W3QA-02, US-2.5
- **Input:**
  - User selects target network from dropdown
  - Current chain ID from wagmi
- **Processing:**
  - Call `wallet_switchEthereumChain` RPC method
  - If chain not added, call `wallet_addEthereumChain`
  - Wait for user approval in wallet popup
  - Update wagmi chain state on success
- **Output:**
  - Success: Network badge updates, chain ID changes
  - Failure: Error if user rejects switch
- **Validations:**
  - Only supported networks in dropdown (Hardhat localhost, Sepolia, Mainnet)
  - Chain parameters (RPC URL, chain ID) must be valid

---

## EPIC-W3QA-03: Interactive Documentation

### FR-010: Level-Based Documentation Structure

**The system must organize documentation by skill level (Beginner/Intermediate/Expert).**

- **Related to:** EPIC-W3QA-03, US-3.1
- **Input:**
  - MDX files organized in `/content/beginner/`, `/content/intermediate/`, `/content/expert/`
- **Processing:**
  - Build-time MDX processing (Contentlayer or next-mdx-remote)
  - Generate navigation structure from file system
  - Apply level-specific styling/badges
- **Output:**
  - Sidebar navigation grouped by level
  - Level indicator on each page
  - Sequential ordering within each level
- **Validations:**
  - All MDX files have required frontmatter (title, level, order)
  - No orphan pages (all linked in navigation)

---

### FR-011: Syntax Highlighting

**The system must render code blocks with syntax highlighting for Solidity and TypeScript.**

- **Related to:** EPIC-W3QA-03, US-3.2
- **Input:**
  - Fenced code blocks in MDX with language identifier
  - ```solidity, ```typescript, ```javascript
- **Processing:**
  - Parse code blocks during MDX compilation
  - Apply syntax highlighting (Shiki or Prism)
  - Generate highlighted HTML with appropriate CSS classes
- **Output:**
  - Code blocks with colored syntax
  - Line numbers displayed
  - Copy button for code blocks
- **Validations:**
  - Supported languages: solidity, typescript, javascript, json, bash
  - Fallback to plain text for unsupported languages

---

### FR-012: Embedded Interactive Components

**The system must support interactive React components embedded in documentation.**

- **Related to:** EPIC-W3QA-03, US-3.3
- **Input:**
  - Custom MDX components imported in content
  - Component props passed via MDX
- **Processing:**
  - MDX compiler recognizes custom components
  - Components rendered with full React capabilities
  - Components can access wallet context
- **Output:**
  - Interactive elements (buttons, inputs, live demos) within docs
  - Components respond to wallet state
  - No page reload required for interactions
- **Validations:**
  - Components must be pre-registered in MDX config
  - Components must handle disconnected wallet state gracefully

---

### FR-013: Sidebar Navigation

**The system must provide a sidebar navigation for documentation browsing.**

- **Related to:** EPIC-W3QA-03, US-3.4
- **Input:**
  - Documentation structure (levels → modules → pages)
  - Current page URL
- **Processing:**
  - Generate navigation tree from content metadata
  - Highlight current page in navigation
  - Expand parent sections of current page
  - Persist expand/collapse state in localStorage
- **Output:**
  - Collapsible sidebar with nested navigation
  - Current page highlighted
  - Smooth scroll to current item if needed
- **Validations:**
  - Navigation updates on route change
  - Mobile: sidebar as slide-out drawer

---

### FR-014: Documentation Search

**The system must allow users to search documentation content.**

- **Related to:** EPIC-W3QA-03, US-3.5
- **Input:**
  - User types search query in search input
  - Minimum 2 characters to trigger search
- **Processing:**
  - Client-side search index (built at compile time)
  - Fuzzy matching on titles and content
  - Rank results by relevance
- **Output:**
  - Dropdown with matching results
  - Result shows: title, snippet with highlighted match, level badge
  - Click navigates to page
- **Validations:**
  - Search results update as user types (debounced 200ms)
  - Maximum 10 results displayed
  - "No results" message if no matches

---

## EPIC-W3QA-04: Smart Contract Labs (Intermediate)

### FR-015: Load Practice Contract

**The system must allow users to load a smart contract by address.**

- **Related to:** EPIC-W3QA-04, US-4.1
- **Input:**
  - Contract address (Ethereum address format)
  - Contract ABI (JSON array) - optional if using pre-configured contract
- **Processing:**
  - Validate address format
  - If pre-configured contract, load ABI from local storage
  - Create viem contract instance
  - Parse ABI to extract functions (read/write)
- **Output:**
  - Contract interface displayed with available functions
  - Functions categorized as Read (view/pure) or Write (state-changing)
  - Function inputs rendered dynamically from ABI
- **Validations:**
  - Valid Ethereum address (0x + 40 hex characters)
  - Valid ABI JSON structure
  - Contract must exist on current network

---

### FR-016: Read Contract Functions

**The system must allow users to call read-only (view/pure) contract functions.**

- **Related to:** EPIC-W3QA-04, US-4.2
- **Input:**
  - Selected function from ABI
  - Function arguments (if any) from input fields
- **Processing:**
  - Validate input types match ABI specification
  - Call `useReadContract` hook (wagmi/viem)
  - Execute `eth_call` RPC request
  - Decode return value according to ABI
- **Output:**
  - Return value displayed in human-readable format
  - Type information shown (uint256, address, string, etc.)
  - Loading state during request
- **Validations:**
  - Input type validation (address, uint, bytes, etc.)
  - Handle revert errors gracefully

---

### FR-017: Write Contract Functions

**The system must allow users to call state-changing contract functions.**

- **Related to:** EPIC-W3QA-04, US-4.3
- **Input:**
  - Selected function from ABI
  - Function arguments from input fields
  - Connected wallet address
- **Processing:**
  - Validate inputs match ABI types
  - Call `useWriteContract` hook
  - Prepare transaction with viem
  - Request wallet signature via provider
  - Submit signed transaction to network
- **Output:**
  - MetaMask popup for transaction approval
  - Transaction hash on submission
  - Loading/pending state until confirmation
- **Validations:**
  - Wallet must be connected
  - Sufficient balance for gas
  - Input validation per ABI types

---

### FR-018: Gas Estimation Display

**The system must display gas estimation before transaction signing.**

- **Related to:** EPIC-W3QA-04, US-4.4
- **Input:**
  - Transaction parameters (to, data, value)
  - Current gas price from network
- **Processing:**
  - Call `eth_estimateGas` RPC method
  - Fetch current gas price (`eth_gasPrice`)
  - Calculate estimated cost: gas × gasPrice
  - Convert to ETH and USD (if price feed available)
- **Output:**
  - Estimated gas units
  - Estimated cost in ETH
  - Optional: cost in USD
- **Validations:**
  - Estimation may fail if tx would revert (show warning)
  - Gas price updates every 15 seconds

---

### FR-019: Transaction Status Tracking

**The system must track and display transaction status through its lifecycle.**

- **Related to:** EPIC-W3QA-04, US-4.5
- **Input:**
  - Transaction hash from submitted transaction
  - Current block number from network
- **Processing:**
  - Poll `eth_getTransactionReceipt` until receipt available
  - Determine status: pending → confirmed OR reverted
  - Extract block number, gas used, status code
- **Output:**
  - Visual status indicator (pending spinner, success check, error X)
  - Confirmation count (current block - tx block)
  - Revert reason if applicable
- **Validations:**
  - Polling interval: 2s for local, 12s for mainnet
  - Timeout after 10 minutes of pending

---

## EPIC-W3QA-05: Transaction & Event Monitoring

### FR-020: Real-Time Transaction Status

**The system must update transaction status in real-time.**

- **Related to:** EPIC-W3QA-05, US-5.1
- **Input:**
  - Transaction hash
  - Network block subscription
- **Processing:**
  - Use `useWaitForTransactionReceipt` hook
  - Subscribe to new blocks for confirmation updates
  - Update UI on each status change
- **Output:**
  - Live status updates without page refresh
  - Confirmation counter increments with new blocks
  - Toast notifications on status changes
- **Validations:**
  - WebSocket connection for live updates (if RPC supports)
  - Fallback to polling if WebSocket unavailable

---

### FR-021: Transaction Details View

**The system must display detailed information for any transaction.**

- **Related to:** EPIC-W3QA-05, US-5.2
- **Input:**
  - Transaction hash (from recent transactions or manual input)
- **Processing:**
  - Fetch transaction data via `eth_getTransactionByHash`
  - Fetch receipt via `eth_getTransactionReceipt`
  - Decode input data if ABI available
- **Output:**
  - Transaction hash (linked to explorer)
  - Block number and timestamp
  - From/To addresses
  - Value transferred
  - Gas limit, gas used, gas price
  - Input data (raw and decoded)
  - Status (success/reverted)
- **Validations:**
  - Valid transaction hash format
  - Transaction must exist on current network

---

### FR-022: Event Monitoring

**The system must monitor and display emitted events from transactions.**

- **Related to:** EPIC-W3QA-05, US-5.3
- **Input:**
  - Contract address to monitor
  - Event signatures to filter (optional)
  - Transaction receipt with logs
- **Processing:**
  - Parse logs from transaction receipt
  - Decode event data using contract ABI
  - Match event signature to event name
- **Output:**
  - List of emitted events with:
    - Event name
    - Decoded parameters (indexed + non-indexed)
    - Log index
  - Chronological ordering
- **Validations:**
  - ABI must include event definitions for decoding
  - Unknown events shown as raw log data

---

### FR-023: Block Explorer Links

**The system must provide links to block explorer for transactions.**

- **Related to:** EPIC-W3QA-05, US-5.4
- **Input:**
  - Transaction hash
  - Current chain ID
- **Processing:**
  - Map chain ID to explorer base URL
    - Mainnet: etherscan.io
    - Sepolia: sepolia.etherscan.io
    - Localhost: (no explorer, show "Local chain" message)
  - Construct transaction URL
- **Output:**
  - Clickable link that opens explorer in new tab
  - Icon indicating external link
- **Validations:**
  - Link only shown for chains with known explorers
  - Local chain shows informational message instead

---

## EPIC-W3QA-06: Local Blockchain Environment

### FR-024: Hardhat Node Documentation

**The system must provide documentation for running a local Hardhat node.**

- **Related to:** EPIC-W3QA-06, US-6.1
- **Input:**
  - User navigates to setup documentation
- **Processing:**
  - Display step-by-step instructions for:
    - Installing Hardhat
    - Running `npx hardhat node`
    - Configuring MetaMask for localhost:8545
- **Output:**
  - Clear, copy-paste commands
  - Expected output examples
  - Troubleshooting section
- **Validations:**
  - Instructions tested on Windows, Mac, Linux
  - Version-specific commands where needed

---

### FR-025: Pre-Deployed Practice Contracts

**The system must provide practice contracts with diverse testing scenarios.**

- **Related to:** EPIC-W3QA-06, US-6.2
- **Input:**
  - Hardhat node running on localhost:8545
  - Deploy script execution
- **Processing:**
  - Deploy contracts covering:
    - Simple storage (read/write uint)
    - Counter with events
    - Access control (owner-only functions)
    - Revert scenarios (require failures)
    - Payable functions
- **Output:**
  - Deployed contract addresses logged
  - ABIs available in platform
  - README with contract descriptions
- **Validations:**
  - Contracts compile with Solidity 0.8.x
  - All functions tested before deployment

---

### FR-026: Environment Setup Documentation

**The system must document complete local development environment setup.**

- **Related to:** EPIC-W3QA-06, US-6.3
- **Input:**
  - User starting from scratch
- **Processing:**
  - Provide documentation covering:
    - Node.js installation
    - Repository cloning
    - Dependency installation
    - Environment variables
    - Starting local chain
    - Starting frontend
- **Output:**
  - Step-by-step guide with commands
  - Environment variable template (.env.example)
  - Common issues and solutions
- **Validations:**
  - Tested on fresh machine
  - Includes verification steps

---

### FR-027: Pre-Funded Test Accounts

**The system must provide test accounts with ETH balance on local chain.**

- **Related to:** EPIC-W3QA-06, US-6.4
- **Input:**
  - Hardhat node startup
- **Processing:**
  - Hardhat automatically creates 20 accounts with 10,000 ETH each
  - Document first 3 accounts with private keys
  - Provide import instructions for MetaMask
- **Output:**
  - Account addresses and private keys in documentation
  - Warning about testnet-only usage
  - MetaMask import guide
- **Validations:**
  - Private keys are Hardhat defaults (well-known, not secret)
  - Clear warnings not to use on mainnet

---

## EPIC-W3QA-07: QA Content

### FR-028: Beginner Wallet Testing Content

**The system must provide Beginner-level content covering wallet testing fundamentals.**

- **Related to:** EPIC-W3QA-07, US-7.1
- **Input:**
  - Content creation by technical writers
- **Processing:**
  - MDX content covering:
    - What is a wallet (conceptual)
    - Connect/disconnect flows
    - Account switching
    - Network switching
    - Session persistence
- **Output:**
  - 3-5 Beginner articles
  - Embedded mini-labs for practice
  - QA checklists for wallet testing
- **Validations:**
  - No prior Web3 knowledge assumed
  - Technical terms defined on first use

---

### FR-029: Intermediate Transaction Lifecycle Content

**The system must provide Intermediate content on transaction lifecycle testing.**

- **Related to:** EPIC-W3QA-07, US-7.2
- **Input:**
  - Content creation by technical writers
- **Processing:**
  - MDX content covering:
    - Transaction anatomy (nonce, gas, data)
    - Lifecycle stages (signed → broadcast → pending → confirmed)
    - Confirmation thresholds
    - Revert handling
    - UI correlation with on-chain state
- **Output:**
  - 4-6 Intermediate articles
  - Interactive diagrams (transaction flow)
  - Lab exercises for each concept
- **Validations:**
  - Builds on Beginner concepts
  - Includes practical testing scenarios

---

### FR-030: Gas Mechanics Content

**The system must provide content explaining gas mechanics for QA purposes.**

- **Related to:** EPIC-W3QA-07, US-7.3
- **Input:**
  - Content creation by technical writers
- **Processing:**
  - MDX content covering:
    - What is gas (execution cost)
    - Gas price vs gas limit
    - EIP-1559 (base fee + priority fee)
    - Gas estimation and why it fails
    - Testing gas-related scenarios
- **Output:**
  - 2-3 articles on gas
  - Gas calculator component
  - Test cases for gas scenarios
- **Validations:**
  - Accurate for post-Merge Ethereum
  - Practical focus (not deep protocol theory)

---

### FR-031: QA Checklists

**The system must provide ready-to-use QA checklists for common Web3 flows.**

- **Related to:** EPIC-W3QA-07, US-7.4
- **Input:**
  - Common testing scenarios identified
- **Processing:**
  - Create checklists for:
    - Wallet connection flow
    - Transaction submission flow
    - Network switching flow
    - Error handling flow
- **Output:**
  - Downloadable/printable checklists
  - Interactive checklist components
  - Pass/fail criteria for each item
- **Validations:**
  - Checklists cover happy path + edge cases
  - Each item is testable and verifiable

---

### FR-032: Edge Case Documentation

**The system must document edge cases and error scenarios for testing.**

- **Related to:** EPIC-W3QA-07, US-7.5
- **Input:**
  - Known Web3 failure modes
- **Processing:**
  - Document edge cases:
    - Insufficient gas
    - Rejected transaction (user cancelled)
    - Reverted transaction (contract error)
    - Network unavailable
    - RPC errors
    - Wallet locked
    - Session expired
- **Output:**
  - Article per edge case category
  - How to reproduce each scenario
  - Expected system behavior
  - Test data/setup requirements
- **Validations:**
  - All scenarios reproducible on local chain
  - Clear reproduction steps

---

## Summary

| Epic | FRs | Count |
|------|-----|-------|
| EPIC-W3QA-01: Platform Foundation | FR-001 to FR-004 | 4 |
| EPIC-W3QA-02: Wallet Connectivity | FR-005 to FR-009 | 5 |
| EPIC-W3QA-03: Interactive Documentation | FR-010 to FR-014 | 5 |
| EPIC-W3QA-04: Smart Contract Labs | FR-015 to FR-019 | 5 |
| EPIC-W3QA-05: Transaction Monitoring | FR-020 to FR-023 | 4 |
| EPIC-W3QA-06: Local Blockchain | FR-024 to FR-027 | 4 |
| EPIC-W3QA-07: QA Content | FR-028 to FR-032 | 5 |
| **Total** | | **32** |
