# Acebadminton Specification (Baseline)

## 1. Overview
Project: Badminton AI Shop. AI-consulted e-commerce for badminton equipment. 
MVP duration: 10 weeks.
Tech: React/TS/Vite/Tailwind (Frontend), Express/TS/Prisma/SQLite (Backend), LLM API (AI).

## 2. Users
- Public: Browse products, search, chat consultation.
- Customer: Log in, manage cart, place orders, view order history.
- Admin: Manage products, categories, brands, users, inventory, orders.

## 3. Workflows
- Product Browsing: Browse/filter/search.
- Chat Consultation: AI advice using DB data.
- Ordering: Add to cart -> Checkout -> Order placement.
- Admin Management: CRUD products/brands/users.

## 4. Functional Requirements
- Backend:
  - Auth: POST `/api/admin/login` (JWT).
  - Products: GET `/api/products` (filter: brand, series, search, category), GET `/api/products/:id`, POST/PUT/DELETE `/api/admin/products` (multipart image upload).
  - Brands: GET `/api/brands`, POST/PUT/DELETE `/api/admin/brands`.
  - Users: GET/DELETE `/api/admin/users`.
  - Stats: GET `/api/admin/stats`, GET `/api/public/stats`.
- Frontend:
  - Admin Dashboard: Layout, login, CRUD views, user list.
  - Public: Layout, product list, search/filter, product detail, cart, chat interface.
- AI:
  - Orchestration: Context-aware prompting (System Prompt + DB context).
  - Parsing: Validate LLM output.

## 5. Non-functional Requirements
- Security: JWT for admin access, hide API keys, validation mandatory.
- Performance: Async operations, Prisma CRUD optimized.
- Reproducibility: Database fully reproducible via scripts/migrations.
- AI Quality: Data-grounded, refuse hallucination, structured output validation.

## 6. System Boundaries
- Frontend Owner: UI, routing, state, API integration.
- Backend/AI/DB Owners: Schema, REST API, AI service.
- Integration: API Contract (`docs/API_CONTRACT.md`) required.

## 7. Acceptance Criteria
- Functional MVP: Stable browsing, chatting, ordering, admin CRUD.
- AI: Grounded advice, 30+ test cases, evaluation report.
- Reproducible DB: Schema + seed scripts.
- Secure: Auth enforced, no leaked keys.
- Process: Git history, documentation, test report.
