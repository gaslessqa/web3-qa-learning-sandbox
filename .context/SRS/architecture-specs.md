# Architecture Specifications: Web3 QA Learning Hub

## Overview

This document describes the system architecture, technology decisions, and data flows for the Web3 QA Learning Hub platform.

---

## 1. System Architecture

### C4 Level 1: System Context

```mermaid
graph TB
    subgraph Users
        U1[QA Engineer<br/>Learner]
    end

    subgraph "Web3 QA Learning Hub"
        WEB[Web Application<br/>Next.js]
    end

    subgraph "External Systems"
        WALLET[Browser Wallet<br/>MetaMask/WalletConnect]
        BLOCKCHAIN[Blockchain Network<br/>Hardhat Local / Sepolia]
        RPC[RPC Provider<br/>Alchemy / Infura]
        EXPLORER[Block Explorer<br/>Etherscan]
    end

    U1 -->|Browses docs, uses labs| WEB
    WEB -->|Requests connection| WALLET
    WALLET -->|Signs transactions| BLOCKCHAIN
    WEB -->|JSON-RPC calls| RPC
    RPC -->|Reads/writes| BLOCKCHAIN
    WEB -->|Links to| EXPLORER
```

### C4 Level 2: Container Diagram

```mermaid
graph TB
    subgraph "User's Browser"
        BROWSER[Browser]
        EXTENSION[Wallet Extension<br/>MetaMask]
    end

    subgraph "Web3 QA Learning Hub"
        subgraph "Next.js Application"
            PAGES[Pages & Layouts<br/>React Server Components]
            COMPONENTS[UI Components<br/>React Client Components]
            HOOKS[Web3 Hooks<br/>wagmi / viem]
            MDX[MDX Content<br/>Documentation]
        end

        subgraph "Build-Time Assets"
            STATIC[Static Files<br/>CSS, JS, Images]
            SEARCH[Search Index<br/>Pre-built JSON]
        end
    end

    subgraph "Local Development"
        HARDHAT[Hardhat Node<br/>localhost:8545]
        CONTRACTS[Practice Contracts<br/>Solidity]
    end

    subgraph "External Services"
        VERCEL[Vercel Edge<br/>Hosting & CDN]
        ALCHEMY[Alchemy RPC<br/>Testnet Access]
    end

    BROWSER --> PAGES
    PAGES --> MDX
    COMPONENTS --> HOOKS
    HOOKS --> EXTENSION
    EXTENSION --> HARDHAT
    HOOKS --> ALCHEMY
    VERCEL --> STATIC
    HARDHAT --> CONTRACTS
```

### Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| **Pages & Layouts** | Route handling, SSR/SSG, page structure |
| **UI Components** | Interactive elements, forms, modals |
| **Web3 Hooks** | Wallet connection, contract interactions |
| **MDX Content** | Documentation rendering, embedded components |
| **Search Index** | Client-side full-text search |
| **Hardhat Node** | Local blockchain for practice |
| **Practice Contracts** | Smart contracts for testing scenarios |

---

## 2. Database Design

### MVP Note

**The MVP is stateless** - no user data is persisted. All state is:
- Client-side (React state, wagmi context)
- Browser storage (localStorage for preferences)
- On-chain (blockchain state)

### Future Database Schema (Post-MVP)

When user accounts and progress tracking are added, the schema will be managed via **Supabase migrations**. Below is the conceptual ERD:

```mermaid
erDiagram
    USERS ||--o{ PROGRESS : tracks
    USERS ||--o{ ACHIEVEMENTS : earns
    MODULES ||--o{ LESSONS : contains
    LESSONS ||--o{ PROGRESS : "completed by"
    ACHIEVEMENTS }|--|| ACHIEVEMENT_TYPES : "is type"

    USERS {
        uuid id PK
        string wallet_address UK
        string display_name
        timestamp created_at
        timestamp last_seen
    }

    MODULES {
        uuid id PK
        string slug UK
        string title
        string level "beginner|intermediate|expert"
        int order
    }

    LESSONS {
        uuid id PK
        uuid module_id FK
        string slug UK
        string title
        string content_path
        int order
    }

    PROGRESS {
        uuid id PK
        uuid user_id FK
        uuid lesson_id FK
        boolean completed
        timestamp completed_at
        jsonb metadata
    }

    ACHIEVEMENTS {
        uuid id PK
        uuid user_id FK
        uuid achievement_type_id FK
        timestamp earned_at
    }

    ACHIEVEMENT_TYPES {
        uuid id PK
        string name UK
        string description
        string icon_url
    }
```

### Data Storage Strategy

| Data Type | Storage | Persistence |
|-----------|---------|-------------|
| Wallet connection | wagmi context | Session only |
| UI preferences | localStorage | Browser persistent |
| Search queries | React state | None |
| Transaction history | On-chain | Blockchain permanent |
| User progress | Supabase (future) | Cloud persistent |

---

## 3. Tech Stack Justification

### Frontend Framework

**Next.js 15 (App Router)**

| Aspect | Details |
|--------|---------|
| ✅ **React Server Components** | Better performance, reduced client JS |
| ✅ **File-based routing** | Intuitive, matches content structure |
| ✅ **Static generation** | MDX pre-rendered at build time |
| ✅ **API routes** | Built-in serverless functions if needed |
| ✅ **Vercel integration** | Zero-config deployment |
| ❌ **Trade-off** | App Router learning curve; newer patterns |

### Language

**TypeScript (Strict Mode)**

| Aspect | Details |
|--------|---------|
| ✅ **Type safety** | Catch errors at compile time |
| ✅ **IDE support** | Autocomplete, refactoring |
| ✅ **ABI typing** | viem generates types from ABIs |
| ✅ **Documentation** | Types serve as inline docs |
| ❌ **Trade-off** | Slightly slower initial development |

### Styling

**Tailwind CSS**

| Aspect | Details |
|--------|---------|
| ✅ **Utility-first** | Rapid prototyping |
| ✅ **Purge unused** | Minimal production CSS |
| ✅ **Consistent design** | Design tokens built-in |
| ✅ **Dark mode** | Built-in support |
| ❌ **Trade-off** | Verbose class names; learning curve |

### Web3 Stack

**wagmi + viem + RainbowKit**

| Aspect | Details |
|--------|---------|
| ✅ **Type-safe** | Full TypeScript support |
| ✅ **React hooks** | Idiomatic React patterns |
| ✅ **RainbowKit UI** | Beautiful wallet modal out-of-box |
| ✅ **Multi-wallet** | MetaMask, WalletConnect, Coinbase |
| ✅ **viem efficiency** | Smaller bundle than ethers.js |
| ❌ **Trade-off** | Less community content than ethers |

### Documentation

**MDX (via next-mdx-remote or Contentlayer)**

| Aspect | Details |
|--------|---------|
| ✅ **React in Markdown** | Embed interactive components |
| ✅ **Static generation** | Pre-rendered at build time |
| ✅ **Frontmatter** | Metadata for navigation, ordering |
| ✅ **Code blocks** | Syntax highlighting built-in |
| ❌ **Trade-off** | Build complexity; component registration |

### Smart Contracts

**Hardhat**

| Aspect | Details |
|--------|---------|
| ✅ **Local blockchain** | Free, fast, deterministic |
| ✅ **TypeScript support** | Config and scripts in TS |
| ✅ **Console.log** | Debug contracts easily |
| ✅ **Forking** | Fork mainnet for realistic tests |
| ❌ **Trade-off** | Slower than Foundry; larger deps |

### Testing

**Playwright + Synpress (Future)**

| Aspect | Details |
|--------|---------|
| ✅ **Playwright** | Modern, fast, reliable E2E |
| ✅ **Synpress** | MetaMask automation |
| ✅ **Cross-browser** | Chrome, Firefox, WebKit |
| ✅ **TypeScript** | Type-safe test code |
| ❌ **Trade-off** | Synpress has breaking changes; maintenance |

### Deployment

**Vercel**

| Aspect | Details |
|--------|---------|
| ✅ **Zero-config** | Auto-detect Next.js settings |
| ✅ **Edge network** | Global CDN |
| ✅ **Preview deploys** | Every PR gets a URL |
| ✅ **Analytics** | Core Web Vitals built-in |
| ❌ **Trade-off** | Vendor lock-in; pricing at scale |

---

## 4. Data Flow

### Flow 1: Documentation Page Load

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Vercel CDN
    participant Next.js

    User->>Browser: Navigate to /docs/beginner/wallets
    Browser->>Vercel CDN: GET /docs/beginner/wallets
    Vercel CDN->>Vercel CDN: Check cache
    alt Cache hit
        Vercel CDN-->>Browser: Return cached HTML
    else Cache miss
        Vercel CDN->>Next.js: Request page
        Next.js->>Next.js: Render MDX to HTML
        Next.js-->>Vercel CDN: Return HTML
        Vercel CDN->>Vercel CDN: Cache response
        Vercel CDN-->>Browser: Return HTML
    end
    Browser->>Browser: Hydrate React components
    Browser-->>User: Display interactive page
```

### Flow 2: Wallet Connection

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant RainbowKit
    participant wagmi
    participant MetaMask

    User->>UI: Click "Connect Wallet"
    UI->>RainbowKit: Open modal
    RainbowKit-->>User: Show wallet options
    User->>RainbowKit: Select MetaMask
    RainbowKit->>wagmi: connect(metamask)
    wagmi->>MetaMask: eth_requestAccounts
    MetaMask-->>User: Approval popup
    User->>MetaMask: Approve connection
    MetaMask-->>wagmi: Return account address
    wagmi->>wagmi: Update state
    wagmi-->>UI: Connection success
    UI-->>User: Show connected address
```

### Flow 3: Smart Contract Read Operation

```mermaid
sequenceDiagram
    participant User
    participant Lab UI
    participant wagmi
    participant RPC Provider
    participant Blockchain

    User->>Lab UI: Click "Read" on getValue()
    Lab UI->>wagmi: useReadContract(getValue)
    wagmi->>RPC Provider: eth_call(contract, data)
    RPC Provider->>Blockchain: Execute call
    Blockchain-->>RPC Provider: Return value
    RPC Provider-->>wagmi: Return decoded value
    wagmi-->>Lab UI: Update hook state
    Lab UI-->>User: Display result
```

### Flow 4: Smart Contract Write Operation

```mermaid
sequenceDiagram
    participant User
    participant Lab UI
    participant wagmi
    participant MetaMask
    participant RPC Provider
    participant Blockchain

    User->>Lab UI: Fill form, click "Write"
    Lab UI->>wagmi: useWriteContract(setValue, args)
    wagmi->>RPC Provider: eth_estimateGas
    RPC Provider-->>wagmi: Return gas estimate
    Lab UI-->>User: Show gas estimate
    wagmi->>MetaMask: eth_sendTransaction
    MetaMask-->>User: Show approval popup
    User->>MetaMask: Approve & sign
    MetaMask->>RPC Provider: Submit signed tx
    RPC Provider->>Blockchain: Broadcast transaction
    Blockchain-->>RPC Provider: Return tx hash
    RPC Provider-->>wagmi: Return tx hash
    wagmi-->>Lab UI: Update state (pending)
    Lab UI-->>User: Show "Transaction pending..."

    loop Poll for receipt
        wagmi->>RPC Provider: eth_getTransactionReceipt
        RPC Provider-->>wagmi: Return receipt (or null)
    end

    wagmi-->>Lab UI: Transaction confirmed
    Lab UI-->>User: Show success + explorer link
```

---

## 5. Security Architecture

### Authentication Flow (MVP)

The MVP uses **wallet-based authentication** without traditional login:

```mermaid
sequenceDiagram
    participant User
    participant Platform
    participant Wallet

    User->>Platform: Access platform
    Platform-->>User: Show public content
    User->>Platform: Click "Connect Wallet"
    Platform->>Wallet: Request accounts
    Wallet-->>User: Approve connection?
    User->>Wallet: Approve
    Wallet-->>Platform: Return address
    Platform->>Platform: Store in React context
    Platform-->>User: Show connected state

    Note over User,Wallet: No password, no JWT<br/>Wallet = Identity
```

### Security Boundaries

```mermaid
graph LR
    subgraph "Trusted Zone"
        PLATFORM[Platform<br/>Static Site]
        CONTENT[MDX Content<br/>Pre-built]
    end

    subgraph "User Controlled"
        BROWSER[Browser]
        WALLET[Wallet Extension]
        KEYS[Private Keys<br/>NEVER leave wallet]
    end

    subgraph "External"
        RPC[RPC Provider]
        CHAIN[Blockchain]
    end

    BROWSER --> PLATFORM
    PLATFORM --> CONTENT
    BROWSER --> WALLET
    WALLET --> KEYS
    BROWSER --> RPC
    RPC --> CHAIN
```

### Key Security Principles

| Principle | Implementation |
|-----------|----------------|
| **Private keys never touch platform** | All signing in wallet |
| **No backend auth in MVP** | Stateless, public content |
| **Input validation** | Zod schemas, address validation |
| **HTTPS only** | Enforced by Vercel |
| **CSP headers** | Restrict script sources |
| **No sensitive storage** | No cookies, no tokens |

### Threat Model

| Threat | Mitigation |
|--------|------------|
| **XSS attacks** | React escaping, CSP headers |
| **Phishing** | No password entry, wallet-based auth |
| **MITM attacks** | HTTPS enforced |
| **Malicious contracts** | Practice contracts are auditable, open source |
| **RPC manipulation** | Use trusted providers (Alchemy, Infura) |

---

## 6. Deployment Architecture

### Environment Configuration

| Environment | URL | Purpose |
|-------------|-----|---------|
| **Local** | localhost:3000 | Development |
| **Preview** | *.vercel.app | PR previews |
| **Production** | web3qa.dev (TBD) | Live site |

### CI/CD Pipeline

```mermaid
graph LR
    subgraph "GitHub"
        PUSH[Push to branch]
        PR[Pull Request]
        MAIN[Merge to main]
    end

    subgraph "GitHub Actions"
        LINT[Lint & Type Check]
        TEST[Run Tests]
        BUILD[Build Check]
    end

    subgraph "Vercel"
        PREVIEW[Preview Deploy]
        PROD[Production Deploy]
    end

    PUSH --> LINT
    LINT --> TEST
    TEST --> BUILD
    PR --> PREVIEW
    MAIN --> PROD
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ALCHEMY_ID` | Alchemy API key | Production |
| `NEXT_PUBLIC_WALLETCONNECT_ID` | WalletConnect project ID | Production |
| `NEXT_PUBLIC_CHAIN_ID` | Default chain (1, 11155111, 31337) | Yes |

---

## 7. Directory Structure

```
/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── docs/                # Documentation pages
│   │   └── [...slug]/
│   │       └── page.tsx
│   └── lab/                 # Lab pages
│       └── [...slug]/
│           └── page.tsx
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── web3/                # Web3-specific components
│   ├── docs/                # Documentation components
│   └── lab/                 # Lab components
├── content/                 # MDX content
│   ├── beginner/
│   ├── intermediate/
│   └── expert/
├── contracts/               # Hardhat project
│   ├── contracts/           # Solidity files
│   ├── scripts/             # Deploy scripts
│   └── hardhat.config.ts
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── styles/                  # Global styles
├── tests/                   # Test files
│   ├── unit/
│   └── e2e/
└── public/                  # Static assets
```

---

## Summary

| Aspect | Decision |
|--------|----------|
| **Architecture** | Static-first with client-side Web3 |
| **Frontend** | Next.js 15 + TypeScript + Tailwind |
| **Web3** | wagmi + viem + RainbowKit |
| **Content** | MDX with embedded components |
| **Local Dev** | Hardhat for blockchain |
| **Deployment** | Vercel Edge |
| **Database** | None (MVP is stateless) |
| **Auth** | Wallet-based only |
