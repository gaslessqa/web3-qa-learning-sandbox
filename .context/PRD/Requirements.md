# Web3 QA Learning Hub

## Visión general

**Web3 QA Learning Hub** es una plataforma web centralizada para aprender **Quality Assurance aplicado a Web3** mediante una combinación de:

- 📚 Documentación interactiva por niveles (Beginner / Intermediate / Expert)
- 🧪 Laboratorios prácticos conectados a wallets y smart contracts reales
- 🤖 Automatización E2E profesional con wallets (Playwright + Synpress)

El objetivo es que los learners no solo consuman teoría, sino que **ejecuten y validen escenarios QA reales en aplicaciones descentralizadas**.

---

## Propuesta de valor

- Aprendizaje **práctico y guiado** de QA Web3
- Enfoque *wallet-first*: la conexión, red y estado on-chain forman parte del testing
- Cobertura completa del **transaction lifecycle**
- Monitorización de **eventos on-chain en tiempo real**
- Automatización E2E realista con MetaMask
- Orientado a QA engineers profesionales y transición Web2 → Web3

---

## Arquitectura del proyecto

### Stack tecnológico unificado

- **Frontend**: Next.js (App Router) + TypeScript
- **UI**: Tailwind CSS
- **Web3**: wagmi + viem + RainbowKit
- **Documentación**: MDX (Contentlayer o MDX loader)
- **Smart Contracts**: Hardhat (local blockchain)
- **QA Automation**: Playwright + Synpress
- **CI/CD**: GitHub Actions

> Se utiliza **Next.js para toda la plataforma** (docs + labs) para mantener estado global de wallet, navegación SPA y coherencia arquitectónica.

---

## Estructura de alto nivel

```txt
/
├─ app/
│  ├─ docs/
│  ├─ lab/
│  └─ layout.tsx
├─ components/
├─ content/
│  ├─ beginner/
│  ├─ intermediate/
│  └─ expert/
├─ contracts/
│  ├─ hardhat.config.ts
│  └─ contracts/
├─ tests/
│  └─ e2e/
├─ docs/
└─ README.md

```

## Módulos funcionales

---

### 1. Plataforma base y navegación

- Rutas claras `/docs` y `/lab`
- Layout compartido con **navbar persistente**
- Estado de wallet mantenido entre páginas
- Estructura escalable de contenidos por niveles (Beginner / Intermediate / Expert)

---

### 2. Wallet Connectivity (Core Web3)

- Botón global **Connect Wallet**
- Soporte para:
  - MetaMask
  - WalletConnect
- UI reactiva según:
  - estado de conexión
  - dirección conectada
  - red activa
- Gestión correcta de:
  - Disconnect
  - limpieza de estado global

---

### 3. Documentación interactiva (MDX)

- Renderizado MDX con **syntax highlighting**
- Soporte para:
  - Solidity
  - JavaScript / TypeScript
- Componentes interactivos embebidos en la documentación
- Layout tipo **split-view** (docs + lab)
- Navegación por niveles y módulos

---

### 4. Laboratorio Intermediate: Smart Contract Interactions

#### Funcionalidades

- Carga de contrato por:
  - Address + ABI
  - contrato de práctica preconfigurado

#### Read operations

- Uso de `useReadContract`
- Inputs dinámicos generados a partir del ABI
- Refetch manual para simular validaciones QA

#### Write operations

- Uso de `useWriteContract`
- Estimación de gas previa
- Firma de transacciones con wallet

#### Transaction lifecycle tracking

- Broadcast
- Pending (mempool)
- Confirmed
- Reverted

- Enlaces dinámicos a block explorer
- Feedback visual y sistema de notificaciones

---

### 5. Event Monitoring & Transaction Inspector

- Monitor en tiempo real de eventos on-chain
- Filtros por:
  - nombre del evento
  - parámetros específicos
- Inspector de transacciones por hash:
  - status
  - block number
  - gas used
  - logs
- Soporte de:
  - polling
  - websocket
  según capacidades del RPC

---

### 6. Backend de práctica local (Hardhat)

- Nodo local en `localhost:8545`
- Smart contract de práctica con:
  - funciones `view` / `pure`
  - funciones `state-changing`
  - emisión de eventos
- Scripts de deploy
- Documentación de uso en entorno local

---

### 7. Contenido QA (Teoría + Manual Testing)

#### Documentación Intermediate

- Transaction lifecycle
- Gas mechanics para QA
- Verificación de state changes mediante eventos
- Correlación UI ↔ blockchain
- QA checklists prácticas

#### Test Suite Manual

**Wallet**
- Connect / Disconnect
- Cancel connection
- Account switching
- Network switching

**Edge cases**
- Insufficient gas
- Rejected transactions
- Unsupported networks
- Wallet lock / unlock

- Persistencia de estado tras refresh de página

---

### 8. QA Automation E2E (Expert Level)

- Playwright como framework base
- Synpress para automatizar MetaMask
- Carga de extensión en browser context
- Configuración mediante `.env`
- Smoke test inicial

#### Tests E2E

- conexión de wallet
- firma de transacciones
- espera de confirmación
- validación de UI y eventos on-chain

#### Ejecución contra

- Hardhat local
- testnets públicas

- Pipeline CI con GitHub Actions

---

## Roadmap recomendado

1. Foundation: Next.js + layout + rutas
2. Wallet integration (wagmi + RainbowKit)
3. Engine de documentación MDX
4. Hardhat + smart contracts de práctica
5. Labs Intermediate (Read / Write / Events)
6. Contenido QA + test suite manual
7. Automatización E2E + CI

---

## Resultado final

Una plataforma educativa profesional donde un **QA engineer aprende Web3** conectando una wallet real, interactuando con smart contracts, validando eventos on-chain y automatizando flujos completos con MetaMask.
