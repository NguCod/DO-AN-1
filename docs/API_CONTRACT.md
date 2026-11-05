# API CONTRACT – Badminton AI Shop

**Frontend Owner:** Nguyễn Công Lân  
**Backend Owner:** [Thành viên ẩn danh]  
**Last Updated:** 2026-11-05

---

## Overview

This document defines the HTTP API contract between Frontend and Backend.
Frontend will use these endpoints once Backend is implemented.
Until then, Frontend uses mock data from `frontend/src/mocks/data.ts`.

All endpoints return JSON. Base URL placeholder: `BASE_URL` (to be set by Backend).

---

## 1. Products

### GET /api/products
List all products with optional filters.

**Query parameters:**
| Param | Type | Required | Description |
|---|---|---|---|
| `category` | string | No | Filter by category name |
| `brand` | string | No | Filter by brand name |
| `minPrice` | number | No | Minimum price (VND) |
| `maxPrice` | number | No | Maximum price (VND) |
| `search` | string | No | Search in product name |
| `sort` | string | No | `price_asc`, `price_desc`, `rating_desc` |
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Items per page (default: 20) |

**Response — 200 OK:**
```json
{
  "data": [
    {
      "id": "prod-1",
      "name": "Yonex Astrox 88D Pro",
      "brand": "Yonex",
      "price": 3500000,
      "description": "Vợt tấn công mạnh mẽ cho người chơi trình độ cao.",
      "category": "Vợt cầu lông",
      "imageUrl": "https://placehold.co/400x600?text=Yonex+Astrox",
      "stock": 15,
      "attributes": { "weight": "3U", "balance": "Head Heavy", "stiffness": "Stiff" },
      "rating": 4.8
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 20
}
```

---

### GET /api/products/:id
Get a single product by ID.

**Path parameter:**
- `id` (string) — Product ID

**Response — 200 OK:**
```json
{
  "id": "prod-1",
  "name": "Yonex Astrox 88D Pro",
  "brand": "Yonex",
  "price": 3500000,
  "description": "Vợt tấn công mạnh mẽ cho người chơi trình độ cao.",
  "category": "Vợt cầu lông",
  "imageUrl": "https://placehold.co/400x600?text=Yonex+Astrox",
  "stock": 15,
  "attributes": { "weight": "3U", "balance": "Head Heavy", "stiffness": "Stiff" },
  "rating": 4.8
}
```

**Response — 404 Not Found:**
```json
{ "error": "Product not found" }
```

---

## 2. Categories

### GET /api/categories
List all categories.

**Response — 200 OK:**
```json
[
  { "id": "cat-1", "name": "Vợt cầu lông", "imageUrl": "https://placehold.co/400x400?text=Vot" },
  { "id": "cat-2", "name": "Giày cầu lông", "imageUrl": "https://placehold.co/400x400?text=Giay" }
]
```

---

## 3. Brands

### GET /api/brands
List all brands.

**Response — 200 OK:**
```json
[
  { "id": "brand-1", "name": "Yonex", "logoUrl": "" },
  { "id": "brand-2", "name": "Victor", "logoUrl": "" },
  { "id": "brand-3", "name": "Lining", "logoUrl": "" }
]
```

---

## 4. Cart (Client-side, no DB needed yet)

Cart state is managed entirely on the Frontend using Zustand/Context.
No backend cart endpoint required for MVP.

If Backend provides cart persistence later, add:
- `POST /api/cart` — create cart with items
- `GET /api/cart/:userId` — get cart for user
- `PATCH /api/cart/:id` — update item quantity
- `DELETE /api/cart/:id` — remove item

---

## 5. Chatbot / AI

### POST /api/chat
Send a message to the AI chatbot for product recommendation.

**Request body:**
```json
{
  "message": "Tìm vợt cầu lông dưới 2 triệu",
  "sessionId": "optional-session-id"
}
```

**Response — 200 OK:**
```json
{
  "reply": "Dựa trên yêu cầu của bạn, tôi đề xuất các sản phẩm sau:\n\n1. Yonex Nanoflare 700 — 2.650.000đ\n2. Victor Thruster F Claw — 2.800.000đ\n\nBạn muốn xem chi tiết sản phẩm nào?",
  "suggestedProducts": [
    { "id": "prod-5", "name": "Yonex Nanoflare 700", "price": 2650000, "imageUrl": "..." },
    { "id": "prod-2", "name": "Victor Thruster F Claw", "price": 2800000, "imageUrl": "..." }
  ]
}
```

**Response — 500 Error:**
```json
{ "error": "AI service unavailable" }
```

> **Important:** Frontend must NOT call any LLM provider directly from the browser.
> All AI requests go through `POST /api/chat` on the Backend.

---

## 6. Orders

### POST /api/orders
Create a new order from cart.

**Request body:**
```json
{
  "customerName": "Nguyễn Công Lân",
  "customerEmail": "shopeethang259@gmail.com",
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "items": [
    { "productId": "prod-1", "quantity": 2 },
    { "productId": "prod-2", "quantity": 1 }
  ],
  "totalAmount": 9800000
}
```

**Response — 201 Created:**
```json
{
  "id": "ord-1",
  "customerName": "Nguyễn Công Lân",
  "status": "PENDING",
  "totalAmount": 9800000,
  "createdAt": "2026-11-05T10:30:00Z"
}
```

---

## 7. Auth (Optional for MVP)

### POST /api/auth/register
Register a new user.

### POST /api/auth/login
Login and receive JWT token.

> Deferred to Phase 6 (Authentication) unless Backend Owner completes earlier.

---

## Frontend Integration Notes

- Use `axios` (already installed) with a base URL configurable via env var `VITE_API_BASE_URL`.
- Until Backend provides endpoints, continue using `MOCK_PRODUCTS` from `frontend/src/mocks/data.ts`.
- Create `frontend/src/services/api.ts` as the single integration point when Backend is ready.
