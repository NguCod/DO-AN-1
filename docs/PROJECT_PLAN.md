# PROJECT PLAN - 10 WEEKS

## 1. Roadmap

| Week | Phase | Primary Focus | Key Deliverables |
|---|---|---|---|
| **1** | **Analysis** | Requirements & Roles | `01_Project_Proposal.md`, Use Case Diagram, 15 Sample Questions |
| **2** | **Data** | DB Design & Data Prep | `02_Data/` (ERD, schema.sql, dict), $\ge$ 3 Business Queries |
| **3** | **AI Base** | LLM & Prompting | Chatbot Prototype, `system_prompt_v1.md`, 20-question Test Table |
| **4** | **Integration**| AI $\leftrightarrow$ DB | Backend-DB connection, Data Flow Diagram, API Contract |
| **5** | **MVP** | Vibe Coding | Stable MVP, Git repo with meaningful commits, `README.md` |
| **6** | **Testing** | AI Quality Eval | `test_cases.csv`, Test Report, `system_prompt_v2.md` |
| **7** | **Advanced** | RAG or Optimization | RAG Module OR Advanced SQL/Context management, Comparison Report |
| **8** | **Hardening** | Security & Cost | Security Checklist, Security Test Report, API Cost Estimation |
| **9** | **Deployment**| Demo Readiness | Git Release Tag, Installation Guide, Slides, Demo Video |
| **10**| **Defense** | Demo & Final Defense| Complete Repo, DB, Prompts, Final Report, Backup Video |

## 2. Detailed Task Breakdown by Module

### Frontend (Owner: Nguyễn Công Lân)
- [ ] Setup project structure (React/Vite/TS).
- [ ] Implement Design System (Colors, Typography, Spacing).
- [ ] Build Core Layouts (Nav, Footer, Main).
- [ ] Develop Product List, Detail, Search/Filter views.
- [ ] Implement Cart & Checkout UI.
- [ ] Develop Chatbot UI (Message list, Input, Suggestion chips).
- [ ] Implement API Adapter/Service layer (initially using mocks).
- [ ] Implement Responsive design & Accessibility.

### Backend (Owner: [Thành viên ẩn danh 3])
- [ ] Setup FastAPI project structure.
- [ ] Implement Auth (JWT/Session).
- [ ] Build REST API for Products, Categories, Brands.
- [ ] Build Cart & Order management services.
- [ ] Build AI Orchestration service (Backend $\leftrightarrow$ LLM).
- [ ] Implement Security (CORS, Rate Limiting, Validation).

### Data (Owner: Trần Đăng Khải)
- [ ] Data collection & cleaning (Badminton products).
- [ ] ERD design & SQL Schema.
- [ ] Migration scripts (Alembic).
- [ ] Data seeding scripts.
- [ ] Data Dictionary documentation.

### AI (Owner: [Thành viên ẩn danh 2])
- [ ] Design `system_prompt_v1.md`.
- [ ] Build prompt engineering pipeline (Context injection).
- [ ] Implement Structured Output parsing.
- [ ] Evaluate AI quality (v1 vs v2).

### QA (Owner: [Thành viên ẩn danh 4])
- [ ] Create Test Plan.
- [ ] Build $\ge$ 30 standard test cases.
- [ ] Run security & AI quality testing.

## 3. Success Criteria
- **Technical:** All modules integrate via agreed contracts.
- **AI:** Chatbot provides data-grounded, non-hallucinated advice.
- **Security:** No leaks of API keys or vulnerable endpoints.
- **Process:** Consistent Git history and documentation.
