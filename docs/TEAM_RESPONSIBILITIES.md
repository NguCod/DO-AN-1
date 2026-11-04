# PROJECT RESPONSIBILITIES

## 1. Role Assignment

| Role | Assigned Member | Responsibility |
|---|---|---|
| **Leader / Integrator** | `[Thành viên ẩn danh 1]` | Progress tracking, task assignment, PR review, release management, shared docs, root configuration. |
| **Data / Database** | `[Trần Đăng Khải]` | Data collection, ERD, schema, migrations, seed, Data Dictionary, business queries. |
| **AI Engineer** | `[Thành viên ẩn danh 2]` | LLM integration, prompt management, context/structured output design, AI quality evaluation. |
| **Backend Developer** | `[Thành viên ẩn danh 3]` | REST API, business logic, auth, DB orchestration, security, AI service orchestration. |
| **Frontend Developer** | **`[Nguyễn Công Lân]`** | **UI/UX, components, routing, state management, API integration (client-side), Chatbot UI, responsive design.** |
| **QA / Tester** | `[Thành viên ẩn danh 4]` | Test plan, test cases, integration/regression testing, bug reporting. |

## 2. Module Ownership & Directory Mapping

| Module | Owner | Primary Directory |
|---|---|---|
| **Frontend** | Nguyễn Công Lân | `frontend/` |
| **Database/Data** | Trần Đăng Khải | `02_Data/`, `backend/app/models/` (schema part) |
| **AI** | `[Thành viên ẩn danh 2]` | `prompts/`, `backend/app/ai/` |
| **Backend** | `[Thành viên ẩn danh 3]` | `backend/app/api/`, `backend/app/services/`, `backend/app/schemas/` |
| **Integration/Docs**| `[Thành viên ẩn danh 1]` | `docs/`, `.env.example`, `docker-compose.yml`, `README.md` |
| **Testing** | `[Thành viên ẩn danh 4]` | `docs/testing/`, `tests/` |

## 3. Collaboration Protocol
- **Contract-First:** No code without `API_CONTRACT.md` or `DATA_CONTRACT.md` agreement.
- **Ownership Protection:** Do not modify files in another owner's directory without formal proposal and approval.
- **Change Management:** Use `docs/CHANGELOG_INTEGRATION.md` for all cross-module interface changes.
- **Mocking:** Frontend uses `frontend/src/mocks/` following the API Contract to enable parallel development.
