# TEAM WORK BOUNDARIES SUMMARY

## 1. Core Principles
- **Module Ownership:** Each module has ONE primary Owner. Others can contribute but MUST NOT change design/structure without consultation.
- **Ownership by Directory:** Responsibilities are tied to specific file paths.
- **Contract-First Development:** API Contracts, Data Contracts, and Integration rules must be finalized BEFORE independent development.
- **Mock-Driven Frontend:** Frontend uses mocks (aligned with API Contract) to develop independently of Backend/AI completion.
- **Integration Management:** All breaking changes must be documented in `docs/CHANGELOG_INTEGRATION.md` and communicated to all affected Owners.

## 2. Module Ownership & Responsibility Matrix

| Module | Primary Owner | Responsibility Scope | Key Paths |
|---|---|---|---|
| **Frontend** | **Nguyễn Công Lân** | UI/UX, Components, Routing, State, API Integration (Browser side), Chatbot UI, Responsive, Form Validation. | `frontend/**` |
| **Database/Data** | `[Trần Đăng Khải]` | Data collection/cleaning, ERD, Schema, Migrations, Seed, Data Dictionary, Business Queries, Integrity. | `02_Data/**`, DB Models/Migrations |
| **AI** | `[Thành viên ẩn danh 2]` | LLM integration, Prompt management, Context handling, Structured output design, AI quality/test. | `prompts/**`, `backend/app/ai/` |
| **Backend** | `[Thành viên ẩn danh 3]` | REST API, Business logic, Auth/Authorization, DB connection, AI orchestration, Security. | `backend/app/api/**`, `backend/app/services/**`, `backend/app/schemas/**` |
| **Project Integration** | `[Thành viên ẩn danh 1]` | Progress tracking, assignment, PR review, release management, shared documentation, base config. | `docs/`, root configs (`.env.example`, `docker-compose.yml`, etc.) |
| **QA / Tester** | `[Thành viên ẩn danh 4]` | Test plans, test cases, integration/regression testing, bug reporting, verification. | `docs/testing/`, `tests/` |

## 3. Integration Rules
- **API Contract:** Mandatory for Frontend $\leftrightarrow$ Backend and Backend $\leftrightarrow$ AI.
- **Data Contract:** Defines shared structures (Product, User, Order, etc.) between Data/DB and all other owners.
- **Breaking Changes:** Propose $\to$ Document in `CHANGELOG_INTEGRATION.md` $\to$ Notify Owners $\to$ Update Contracts $\to$ Sync Modules.

## 4. Frontend-Specific Boundaries (Owner: Nguyễn Công Lân)
- **Can do:** Design UI, components, state, routing, implement API calls via contract, display chatbot, handle loading/error/empty states, implement responsive design.
- **Must NOT do:** Change DB schema/migrations, write server-side business logic, manage API keys/LLM calls directly, change AI prompt logic.
