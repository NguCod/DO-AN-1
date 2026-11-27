# Implementation Plan: Acebadminton Baseline

**Branch**: `001-baseline-spec` | **Date**: 2026-11-24 | **Spec**: specs/001-baseline-spec/spec.md

**Input**: Feature specification from `/specs/001-baseline-spec/spec.md`

## Summary

Create a comprehensive baseline specification and implementation plan for the existing Badminton AI Shop project. The project is a full-stack e-commerce web application with AI-driven product consultation. Current tech stack: React/TypeScript/Vite/Tailwind (Frontend), Express/TypeScript/Prisma/SQLite (Backend), OpenAI API (AI). The plan preserves existing working functionality, extends with Cart/Order entities, defines API contracts, and establishes testing/validation strategies consistent with the project constitution.

## Technical Context

**Language/Version**: 
- Frontend: TypeScript 5.x, React 18, Vite 5
- Backend: TypeScript (Express) 
- Database: SQLite (development), PostgreSQL (production)
- ORM: Prisma

**Primary Dependencies**: 
- Frontend: axios, zustand, lucide-react, tailwindcss
- Backend: @prisma/client, express, cors, jsonwebtoken, multer, zod
- AI: OpenAI API (assumed)

**Storage**: SQLite (development), PostgreSQL (production)

**Testing**: 
- Backend: Jest / supertest
- Frontend: Vitest + Testing Library
- E2E: Playwright

**Target Platform**: Web (desktop/mobile responsive)

**Project Type**: Web application (frontend + backend)

**Performance Goals**: 
- AI orchestration latency < 3s
- Admin CRUD operations < 2s
- Support 1000 concurrent users

**Constraints**: 
- Must use existing database schema (extend only)
- Must use existing API structure (Express routes in backend/src/index.ts)
- Must use existing frontend framework (React/TS/Vite)
- AI must be grounded in database context
- Security must be enforced at backend level

**Scale/Scope**: 
- MVP supports 1000 concurrent users
- 100k product catalog size
- 100k user accounts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Gates from Constitution**:

| Principle | Status | Verification |
|-----------|--------|--------------|
| Test-First (NON-NEGOTIABLE) | PASS | All FR/SC have acceptance criteria |
| AI-Grounding | PASS | AI responses must reference DB context, refuse hallucination |
| Security-By-Design | PASS | JWT auth on admin routes, API keys hidden |
| Incremental Development | PASS | Spec → Design → AI Code → Review → Test → Commit |
| Simplicity | PASS | Minimum viable scope, no speculative features |

## Project Structure

### Documentation (this feature)

```text
specs/001-baseline-spec/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── api-contract.md  # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
backend/
├── src/
│   └── index.ts          # Main Express server (all routes)
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts           # Seed data
│   └── migrations/       # Prisma migrations
├── package.json
└── tsconfig.json

frontend/
├── src/
│   ├── components/
│   │   ├── admin/        # Admin dashboard components
│   │   ├── auth/         # Auth components
│   │   ├── layout/       # Layout components
│   │   ├── product/      # Product components
│   │   └── chat/         # Chatbot components
│   ├── context/          # React context providers
│   ├── services/         # API service layer
│   ├── types/            # TypeScript types
│   ├── theme/            # Theme constants
│   ├── mocks/            # Mock data
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json

02_Data/                  # Data exports and documentation
docs/                     # Project documentation
prompts/                  # AI system prompts
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Phase 0: Research (COMPLETE)

Research findings documented in `research.md`. All technical context resolved.

## Phase 1: Design & Contracts (COMPLETE)

### 1. Data Model (`data-model.md`)
- Brand, Product, User, Cart, CartItem, Order, OrderItem entities defined
- Relationships established per business requirements

### 2. API Contracts (`contracts/api-contract.md`)
- Complete REST API specification for all endpoints
- Includes authentication, error formats, rate limiting
- New Cart and Order endpoints defined

### 3. Quickstart Guide (`quickstart.md`)
- Setup and validation instructions
- Success criteria defined

## Next Phase: Phase 2 - Task Generation

Run `/speckit-tasks` to generate actionable implementation tasks based on this plan.

## Dependencies

- Backend API stability required before frontend integration
- Database schema finalization before data model changes
- AI integration requires stable API endpoints
- Frontend must implement API contracts exactly

## Risks

1. **API Inconsistency**: Backend API may not support all required cart/order operations
2. **Data Model Conflict**: New entities may conflict with existing schema
3. **AI Integration**: AI may not access required data in required format
4. **Frontend-Backend Sync**: Misalignment between expectations and contracts
5. **Security**: Inadequate auth/authorization for admin features

## Unresolved Assumptions

1. LLM API will be available and stable during implementation
2. Existing database schema can be extended without breaking changes
3. Frontend team has capacity to implement AI chatbot UI
4. Testing infrastructure available for E2E testing
5. Project has sufficient resources for 10-week timeline