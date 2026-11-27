# tasks.md: Acebadminton Baseline Implementation Tasks

**Branch**: `001-baseline-spec` | **Generated**: 2026-11-24 | **Spec**: specs/001-baseline-spec/spec.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize Node.js project with Express, Prisma, React dependencies
- [ ] T003 [P] Configure ESLint and Prettier for both frontend and backend

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Setup database schema and migrations framework (Prisma schema update with Cart/Order entities)
- [x] T005 [P] Implement authentication/authorization framework (JWT middleware in Express)
- [x] T006 [P] Setup API routing and middleware structure (Express routes in backend/src/index.ts)
- [x] T007 [P] Create base models that all stories depend on (Brand, Product models from data-model.md)
- [x] T008 Configure error handling and logging infrastructure (Express error middleware, Winston logger)
- [x] T009 Setup environment configuration management (.env handling for DATABASE_URL, SECRET_KEY, API keys)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

## Phase 3: User Story 1 - System Baseline Verification (Priority: P1) 

**Goal**: Verify existing implementation matches documentation and current codebase state. Establish ground truth for all future development.

**Independent Test**: Comparison of code/docs/spec shows no discrepancies. All existing features correctly identified.

- [ ] T010 [P] [US1] Contract test for GET /api/products in tests/contract/products_contract.test.js
- [ ] T011 [P] [US1] Integration test for product browsing flow in tests/integration/product_browse.test.js

### Implementation for User Story 1

- [x] T012 [P] [US1] Create Product model in backend/src/models/product.model.ts (extends Prisma Brand/Product)
- [x] T013 [P] [US1] Create Brand model in backend/src/models/brand.model.ts
- [x] T014 [US1] Implement ProductService in backend/src/services/product.service.ts (depends on T012, T013)
- [x] T015 [US1] Implement GET /api/products endpoint in backend/src/routes/product.routes.ts (depends on T014)
- [x] T016 [US1] Add validation and error handling for product queries (zod validation schemas)
- [x] T017 [US1] Add logging for product operations (Winston logger integration)
- [x] T018 [P] [US1] Frontend: Create product listing component in frontend/src/components/ProductList.tsx
- [x] T019 [P] [US1] Frontend: Integrate product API service in frontend/src/services/api.service.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Public user can browse products via UI.

## Phase 4: User Story 2 - Core E-commerce Flow (Priority: P1)

**Goal**: Users can browse, search, and view product details. Primary business value flow.

**Independent Test**: Public user can find any product in DB via UI. All search/filter operations return correct results.

- [ ] T020 [P] [US2] Contract test for GET /api/products with filters in tests/contract/products_filter_contract.test.js
- [ ] T021 [P] [US2] Integration test for search/filter flow in tests/integration/product_search.test.js

### Implementation for User Story 2

- [ ] T022 [P] [US2] Implement search functionality in GET /api/products (brand, series, search, category query params)
- [ ] T023 [P] [US2] Create ProductDetail component in frontend/src/components/ProductDetail.tsx
- [ ] T024 [US2] Frontend: Add search/filter UI in frontend/src/pages/ShopPage.tsx
- [ ] T025 [US2] Implement frontend search state management (zustand store or React useState)
- [ ] T026 [US2] Add debounced search input to prevent API spam
- [ ] T027 [P] [US2] Implement cart integration: Add to Cart button on Product Detail page
- [ ] T028 [P] [US2] Implement cart API endpoints (POST /cart/items, GET /cart)
- [ ] T029 [US2] Frontend: Connect cart service to API endpoints

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Public user can browse, search, and view product details.

## Phase 5: User Story 3 - AI Consultation (Priority: P2)

**Goal**: AI-driven product consultation via Backend-LLM orchestration. Users receive grounded product advice based on database data.

**Independent Test**: AI responses 90% grounded in provided DB context. Chatbot refuses when information absent.

- [ ] T030 [P] [US3] Contract test for POST /chat in tests/contract/chat_contract.test.js
- [ ] T031 [P] [US3] Integration test for AI consultation flow in tests/integration/ai_consultation.test.js

### Implementation for User Story 3

- [ ] T032 [P] [US3] Implement Backend-LLM orchestration layer in backend/src/ai/orchestration.service.ts (depends on data-model.md entities, FR-003, FR-006 latency < 3s)
- [ ] T033 [US3] Create System Prompt v2 in prompts/system_prompt_v2.md (constitution AI-Grounding principle, refusal policy)
- [ ] T034 [US3] Implement POST /chat endpoint in backend/src/routes/chat.routes.ts (depends on T032, system_prompt_v2.md)
- [ ] T035 [US3] Frontend: Create chatbot UI component in frontend/src/components/Chatbot.tsx
- [ ] T036 [US3] Frontend: Connect chat service to API endpoints (POST /chat)
- [ ] T037 [P] [US3] Add frontend loading/typing indicators for AI responses
- [ ] T038 [US3] Implement conversation history management (localStorage or backend storage)

**Checkpoint**: At this point, User Stories 1, 2, and 3 should all be independently functional.

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T039 [P] Documentation updates in docs/ (update API contract, data model docs)
- [ ] T040 Code cleanup and refactoring across all story implementations
- [ ] T041 [P] Performance optimization across all stories (verify AI latency < 3s, CRUD < 2s)
- [ ] T042 [P] Additional unit tests (if requested) in tests/unit/
- [ ] T043 Security hardening (JWT validation, rate limiting enforcement, input validation)
- [ ] T044 Run quickstart.md validation (end-to-end verification of all flows)

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

### Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for GET /api/products in tests/contract/products_contract.test.js"
Task: "Integration test for product browsing flow in tests/integration/product_browse.test.js"

# Launch all models for User Story 1 together:
Task: "Create Product model in backend/src/models/product.model.ts"
Task: "Create Brand model in backend/src/models/brand.model.ts"
Task: "Implement ProductService in backend/src/services/product.service.ts"
```

### Implementation Strategy

#### MVP First (User Story 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Product browsing)
4. Complete Phase 4: User Story 2 (Search/Filter + Cart)
5. **STOP and VALIDATE**: Test User Stories 1 and 2 independently
6. Deploy/demo if ready (MVP: product browsing + search + cart)

#### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

#### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Product browsing + API)
   - Developer B: User Story 2 (Search/Filter + Cart)
   - Developer C: User Story 3 (AI consultation)
3. Stories complete and integrate independently

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

## Quickstart Validation (T044)

Run these commands to validate the complete implementation:

```bash
# Backend
cd backend && uvicorn app.main:app --reload --port 8000

# Frontend  
cd frontend && npm run dev

# Verify
# 1. Open http://localhost:5173 - product listing loads
# 2. Search/filter works
# 3. Product detail page loads
# 4. Add to cart works
# 5. AI chatbot responds with grounded advice
# 6. All API endpoints return correct responses
```