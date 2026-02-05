# Web3 QA Learning Hub

A comprehensive learning platform for Web3 Quality Assurance, helping QA engineers and developers master blockchain testing, smart contract auditing, and decentralized application testing.

## Features

- **Interactive Learning Modules** - Structured courses from beginner to expert level
- **Progress Tracking** - Track your learning journey with lesson completion
- **Achievement System** - Earn badges as you complete modules and milestones
- **User Authentication** - Secure login with email/password or OAuth (GitHub, Google)
- **Web3 Integration** - Connect your wallet for hands-on blockchain exercises

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **React Query** - Server state management

### Backend
- **Supabase** - PostgreSQL database + Auth + Real-time subscriptions
- **Row Level Security** - Data protection at the database level

### Web3 (Coming Soon)
- **wagmi** - React hooks for Ethereum
- **viem** - TypeScript Ethereum library
- **RainbowKit** - Wallet connection UI

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gaslessqa/web3-qa-learning-sandbox.git
   cd web3-qa-learning-sandbox
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── auth/callback/     # OAuth callback handler
│   ├── dashboard/         # User dashboard (protected)
│   ├── modules/[slug]/    # Module detail pages
│   ├── lessons/[slug]/    # Lesson detail pages
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/            # React components
│   └── providers.tsx      # App providers (Auth, React Query)
├── contexts/              # React contexts
│   └── auth-context.tsx   # Authentication context
├── lib/                   # Utility libraries
│   ├── config.ts          # Environment configuration
│   └── supabase/          # Supabase clients
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       └── middleware.ts  # Session management
├── middleware.ts          # Route protection
└── types/                 # TypeScript types
    └── supabase.ts        # Generated database types
```

## Database Schema

| Table | Description |
|-------|-------------|
| `profiles` | User profiles linked to Supabase Auth |
| `modules` | Learning modules (beginner, intermediate, expert) |
| `lessons` | Individual lessons within modules |
| `progress` | User lesson completion tracking |
| `achievements` | User earned achievements |
| `achievement_types` | Available achievement definitions |

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run typecheck    # Run TypeScript type checking
npm run format       # Format code with Prettier
```

## Learning Modules

### Beginner: Web3 QA Fundamentals
- Introduction to Blockchain Testing
- Testing Tools Overview
- Writing Your First Test

### Intermediate: Smart Contract Testing
- Unit Testing in Solidity
- Integration Testing
- Fuzzing Fundamentals

### Expert: Security & Auditing
- Common Smart Contract Vulnerabilities
- Audit Methodology

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

This project is licensed under the ISC License.

## Documentation

For detailed documentation, see the `.context/` directory:
- [Backend Setup Guide](.context/backend-setup.md)
- [API Documentation](.context/api-documentation.md)

---

Built with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/)
