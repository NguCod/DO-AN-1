# Research: Acebadminton Baseline Specification Analysis

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

**Gates**:
- Must pass Constitution Check before Phase 0
- Must maintain Test-First principle (all functionality testable)
- Must maintain AI-Grounding (AI responses grounded in DB context)
- Must maintain Security-By-Design (admin auth enforced)
- Must maintain Incremental Development (vibe coding workflow)

**Gates Status**: PASS (all existing features documented and testable)

## Project Structure

### Documentation (this feature)
```text
specs/001-baseline-spec/
├── plan.md              # This file
├── research.md          # This file
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
│   └── index.ts          # Main Express server
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts           # Seed data
│   └── migrations/       # Prisma migrations
├── package.json
└── tsconfig.json

frontend/
├── src/
│   ├── components/
│   │   ├── admin/        # Admin dashboard
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

## Phase 0: Generate research.md (COMPLETE)

## Phase 1: Design & Contracts (COMPLETE)

### 1. Extract Entities from Feature Spec (data-model.md)

**Entities**:
- Brand: name, slug, products (relation)
- Product: name, series, price, weight, stiffness, balance, playstyle, imageUrl, brandId, createdAt, updatedAt
- User: email, name, password, role, cart (1:1), orders (1:n), createdAt, updatedAt
- Cart: userId, items (array of CartItem), createdAt, updatedAt
- CartItem: productId, quantity, priceAtTime
- Order: userId, totalAmount, status, createdAt, updatedAt, items (array of OrderItem)
- OrderItem: productId, quantity, priceAtTime, shippedAt (nullable)

### 2. API Contracts (contracts/api-contract.md)

**Base Configuration**:
- Base URL: `/api`
- Content-Type: `application/json` (multipart for uploads)
- Authentication: JWT Bearer token for admin endpoints
- Versioning: URL-based (v1)

**Error Response Format**:
```json
{
  "error": "Human-readable error message",
  "details": "Optional technical details",
  "code": "ERROR_CODE"
}
```

**Authentication**:
- **POST /admin/login**: Authenticate admin (JWT token)
  - Request: `{ "username": string, "password": string }`
  - Success (200): `{ "token": string, "username": string, "role": string }`
  - Error (401): `{ "error": "Sai tài khoản hoặc mật khẩu" }`

### Products
- **GET /products**: Filter by brand, series, search, category
- **GET /products/{id}**: Single product with brand info
- **POST /admin/products**: Create product (multipart, image upload)
- **PUT /admin/products/{id}**: Update product (multipart)
- **DELETE /admin/products/{id}**: Delete product

### Brands
- **GET /brands**: Return brands with product count
- **POST /admin/brands**: Create brand (name, optional slug)
- **PUT /admin/brands/{id}**: Update brand
- **DELETE /admin/brands/{id}**: Delete brand (if no products)

### Users
- **GET /admin/users**: User list (admin only)
- **DELETE /admin/users/{id}**: Delete user (admin only)

### Cart (New)
- **GET /cart**: User's cart (admin only)
- **POST /cart/items**: Add item to cart (admin only)
- **DELETE /cart/items/{itemId}**: Remove item from cart (admin only)

### Orders (New)
- **POST /orders**: Create order from cart (admin only)
- **GET /orders/{id}**: Order details (admin only)

### AI Chatbot
- **POST /chat**: Process message with AI
  - Request: `{ "message": string, "conversationId": string (optional), "context": object (optional) }`
  - Response: `{ "response": string, "conversationId": string, "recommendations": [ { "productId": int, "name": string, "price": string, "imageUrl": string, "description": string } ] }`

### Validation Rules
- All required fields required
- Prices as numeric strings
- Email valid format
- JWT valid and not expired
- File uploads: image/* and <5MB
- Quantity positive integer
- Order status: pending/completed/cancelled
- Rate limiting: Chat 30/min, Admin 100/min, Public 60/min

## Phase 1: Design & Contracts (COMPLETE)

### 1. Data Model (data-model.md)
- Brand, Product, User, Cart, CartItem, Order, OrderItem entities defined
- Relationships established per business requirements

### 2. API Contracts (contracts/api-contract.md)
- Complete REST API specification
- Includes authentication, error formats, rate limiting
- New Cart and Order endpoints defined

### 3. Quickstart Guide (quickstart.md)
- Setup and validation instructions
- Success criteria defined

## Phase 2: Generate tasks.md (PENDING)