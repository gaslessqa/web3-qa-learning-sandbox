# Non-Functional Specifications: Web3 QA Learning Hub

## Overview

This document defines the Non-Functional Requirements (NFRs) for the Web3 QA Learning Hub platform. These requirements ensure the system meets quality standards for performance, security, scalability, and usability.

---

## 1. Performance

### Page Load Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Largest Contentful Paint (LCP)** | < 2.0s | Lighthouse, Web Vitals |
| **First Input Delay (FID)** | < 100ms | Lighthouse, Web Vitals |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Lighthouse, Web Vitals |
| **Time to Interactive (TTI)** | < 3.0s | Lighthouse |
| **First Contentful Paint (FCP)** | < 1.5s | Lighthouse |

### Application Performance

| Metric | Target | Notes |
|--------|--------|-------|
| **Client-side navigation** | < 300ms | Next.js App Router with prefetching |
| **MDX page render** | < 500ms | Pre-compiled at build time |
| **Search results** | < 200ms | Client-side index, debounced input |
| **Wallet connection modal** | < 100ms | RainbowKit lazy-loaded |

### Web3 Operations

| Metric | Target | Notes |
|--------|--------|-------|
| **Read contract call** | < 500ms | Dependent on RPC provider |
| **Gas estimation** | < 1s | Pre-flight before transaction |
| **Transaction status poll** | Every 2s (local) / 12s (mainnet) | Configurable per network |
| **Event decoding** | < 100ms | Client-side ABI parsing |

### Capacity (MVP)

| Metric | Target | Notes |
|--------|--------|-------|
| **Concurrent users** | 100 | Static site, scales automatically |
| **Daily active users** | 500 | Analytics baseline |
| **CDN bandwidth** | 100GB/month | Vercel Pro limits |

---

## 2. Security

### Authentication & Authorization

| Requirement | Specification |
|-------------|---------------|
| **Authentication** | Wallet-based (no passwords in MVP) |
| **Authorization** | Public content (no RBAC in MVP) |
| **Session management** | wagmi handles wallet session |
| **Token handling** | No JWT tokens in MVP (no backend auth) |

### Web3 Security

| Requirement | Specification |
|-------------|---------------|
| **Private key handling** | Never stored or transmitted by platform |
| **Transaction signing** | Delegated entirely to user's wallet |
| **RPC security** | Use HTTPS RPC endpoints only |
| **Network validation** | Warn on unsupported networks |

### Data Protection

| Requirement | Specification |
|-------------|---------------|
| **Data at rest** | No user data stored in MVP (stateless) |
| **Data in transit** | HTTPS/TLS 1.3 enforced |
| **PII collection** | None (no registration in MVP) |
| **Analytics** | Privacy-respecting (no PII, anonymized) |

### Input Validation

| Requirement | Specification |
|-------------|---------------|
| **Client-side** | Zod schemas for all form inputs |
| **Ethereum addresses** | Regex validation + checksum verification |
| **ABI input** | JSON schema validation |
| **Search queries** | Sanitized, max 100 characters |

### OWASP Top 10 Mitigations

| Vulnerability | Mitigation |
|---------------|------------|
| **Injection** | No SQL/NoSQL (static site); input sanitization |
| **Broken Auth** | Wallet-based, no password storage |
| **Sensitive Data** | No sensitive data stored |
| **XXE** | No XML processing |
| **Broken Access** | Public content, no access control needed |
| **Security Misconfig** | Vercel defaults, security headers |
| **XSS** | React's default escaping, CSP headers |
| **Insecure Deserialization** | JSON.parse with try/catch |
| **Vulnerable Components** | Dependabot alerts, regular updates |
| **Logging/Monitoring** | Vercel Analytics, error tracking |

### Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 3. Scalability

### Architecture Scalability

| Component | Strategy |
|-----------|----------|
| **Frontend** | Static generation + ISR on Vercel Edge |
| **API Routes** | Serverless functions (auto-scale) |
| **CDN** | Vercel Edge Network (global distribution) |
| **Database** | None in MVP (stateless) |

### Caching Strategy

| Resource | Cache Strategy | TTL |
|----------|----------------|-----|
| **Static pages** | Immutable | Until redeploy |
| **MDX content** | ISR | 1 hour |
| **Static assets** | CDN cached | 1 year |
| **RPC responses** | No cache | Real-time data |

### Future Scaling Considerations

| Scenario | Preparation |
|----------|-------------|
| **10x traffic** | Vercel auto-scales; no changes needed |
| **User accounts** | Add Supabase Auth when ready |
| **Progress tracking** | Add Supabase database when ready |
| **Global latency** | Already on edge network |

---

## 4. Accessibility

### WCAG 2.1 Compliance

| Level | Target | Status |
|-------|--------|--------|
| **Level A** | Required | MVP |
| **Level AA** | Required | MVP |
| **Level AAA** | Optional | Future |

### Specific Requirements

| Requirement | Specification |
|-------------|---------------|
| **Keyboard navigation** | All interactive elements focusable and operable |
| **Screen readers** | ARIA labels on custom components |
| **Color contrast** | Minimum 4.5:1 for normal text, 3:1 for large text |
| **Focus indicators** | Visible focus ring on all interactive elements |
| **Alt text** | All images have descriptive alt text |
| **Skip links** | "Skip to content" link for keyboard users |
| **Heading hierarchy** | Logical H1 → H6 structure |
| **Form labels** | All inputs have associated labels |

### Assistive Technology Support

| Technology | Support Level |
|------------|---------------|
| **VoiceOver (macOS/iOS)** | Full |
| **NVDA (Windows)** | Full |
| **JAWS (Windows)** | Tested |
| **Keyboard only** | Full |
| **High contrast mode** | Supported |
| **Reduced motion** | `prefers-reduced-motion` respected |

---

## 5. Browser Support

### Desktop Browsers

| Browser | Versions | Priority |
|---------|----------|----------|
| **Chrome** | Last 2 versions | P0 |
| **Firefox** | Last 2 versions | P0 |
| **Safari** | Last 2 versions | P0 |
| **Edge** | Last 2 versions | P1 |

### Mobile Browsers

| Browser | Versions | Priority |
|---------|----------|----------|
| **iOS Safari** | Last 2 versions | P0 |
| **Android Chrome** | Last 2 versions | P0 |
| **Samsung Internet** | Last 2 versions | P2 |

### Wallet Extension Support

| Wallet | Browser | Priority |
|--------|---------|----------|
| **MetaMask** | Chrome, Firefox, Edge | P0 |
| **Coinbase Wallet** | Chrome | P1 |
| **Rainbow** | Mobile (via WalletConnect) | P1 |

### Not Supported

- Internet Explorer (any version)
- Browsers without ES2020 support
- Browsers without WebSocket support

---

## 6. Reliability

### Availability Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Uptime** | 99.9% | Vercel status, uptime monitoring |
| **Mean Time to Recovery (MTTR)** | < 30 minutes | Incident response |
| **Planned downtime** | 0 (zero-downtime deploys) | Vercel |

### Error Handling

| Scenario | Behavior |
|----------|----------|
| **Page not found** | Custom 404 page with navigation |
| **Server error** | Custom 500 page with error ID |
| **Network offline** | Cached content available, offline indicator |
| **RPC unavailable** | Graceful degradation, retry with backoff |
| **Wallet disconnected** | Clear UI state, prompt to reconnect |

### Error Rates

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Client-side errors** | < 0.5% of sessions | Error tracking |
| **Failed RPC calls** | < 2% | Logging |
| **Unhandled exceptions** | 0 in production | Error boundary |

---

## 7. Maintainability

### Code Quality

| Metric | Target | Tool |
|--------|--------|------|
| **TypeScript coverage** | 100% | `strict: true` |
| **Linting errors** | 0 | ESLint |
| **Formatting** | Consistent | Prettier |
| **Test coverage** | > 70% | Vitest |

### Development Standards

| Standard | Specification |
|----------|---------------|
| **TypeScript** | Strict mode enabled |
| **ESLint** | Next.js recommended + custom rules |
| **Prettier** | Consistent formatting |
| **Husky** | Pre-commit hooks for lint/format |
| **Commitlint** | Conventional commits |

### Documentation Requirements

| Documentation | Location |
|---------------|----------|
| **README** | Repository root |
| **Architecture** | `.context/SRS/architecture-specs.md` |
| **API contracts** | `.context/SRS/api-contracts.yaml` |
| **Component docs** | Storybook (future) |
| **Setup guide** | `/docs/setup.md` |

### Dependency Management

| Requirement | Specification |
|-------------|---------------|
| **Updates** | Weekly dependency review |
| **Security** | Dependabot enabled |
| **Lock file** | `bun.lock` committed |
| **Version pinning** | Exact versions for production deps |

---

## 8. Internationalization (Future)

### MVP Scope

| Requirement | Status |
|-------------|--------|
| **Primary language** | English only |
| **RTL support** | Not required |
| **Date/time** | Browser locale |
| **Number formatting** | ETH/Gwei standards |

### Preparation for i18n

| Requirement | Implementation |
|-------------|----------------|
| **String extraction** | Use `next-intl` when ready |
| **No hardcoded strings** | Use constants/translation keys |
| **Unicode support** | UTF-8 everywhere |

---

## 9. Monitoring & Observability

### Analytics

| Tool | Purpose |
|------|---------|
| **Vercel Analytics** | Core Web Vitals, traffic |
| **Plausible/Fathom** | Privacy-respecting page views |
| **Custom events** | Lab completions, wallet connections |

### Error Tracking

| Tool | Purpose |
|------|---------|
| **Sentry** | Client-side error tracking |
| **Vercel Logs** | Serverless function logs |

### Alerting (Future)

| Metric | Alert Threshold |
|--------|-----------------|
| **Error rate** | > 1% of sessions |
| **LCP degradation** | > 3s average |
| **Uptime** | < 99.5% |

---

## NFR Summary Matrix

| Category | Priority | MVP Status |
|----------|----------|------------|
| Performance | P0 | Core Web Vitals targets |
| Security | P0 | HTTPS, input validation, no PII |
| Scalability | P1 | Static + serverless (auto-scale) |
| Accessibility | P0 | WCAG 2.1 AA compliance |
| Browser Support | P0 | Chrome, Firefox, Safari, Edge |
| Reliability | P0 | 99.9% uptime target |
| Maintainability | P1 | TypeScript strict, linting, tests |
| Internationalization | P2 | English only (MVP) |
| Monitoring | P1 | Vercel Analytics + Sentry |
