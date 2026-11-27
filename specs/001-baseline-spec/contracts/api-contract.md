# API Contract: Acebadminton Badminton AI Shop

## Overview

This document defines the REST API contract for the Badminton AI Shop application. All endpoints follow standard REST conventions with JSON request/response bodies.

## Base Configuration

- **Base URL**: `/api`
- **Content-Type**: `application/json` (except multipart for file uploads)
- **Authentication**: JWT Bearer token for admin endpoints
- **Versioning**: URL-based (v1)

## Error Response Format

All error responses follow this format:
```json
{
  "error": "Human-readable error message",
  "details": "Optional technical details",
  "code": "ERROR_CODE"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

## Authentication

### POST /admin/login

Authenticate admin user and return JWT token.

**Request**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200)**:
```json
{
  "token": "string (JWT)",
  "username": "string",
  "role": "string"
}
```

**Response (401)**:
```json
{
  "error": "Sai tài khoản hoặc mật khẩu"
}
```

## Products

### GET /products

Retrieve products with optional filtering.

**Query Parameters**:
- `brand` (string, optional): Filter by brand name
- `series` (string, optional): Filter by series (partial match)
- `search` (string, optional): Search in product name
- `category` (string, optional): Filter by category/series

**Response (200)**:
```json
[
  {
    "id": "integer",
    "name": "string",
    "series": "string",
    "price": "string",
    "weight": "string",
    "stiffness": "string",
    "balance": "string",
    "playstyle": "string",
    "imageUrl": "string",
    "brandId": "integer",
    "brand": {
      "id": "integer",
      "name": "string",
      "slug": "string"
    },
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
]
```

### GET /products/{id}

Retrieve single product by ID.

**Path Parameters**:
- `id` (integer): Product ID

**Response (200)**:
```json
{
  "id": "integer",
  "name": "string",
  "series": "string",
  "price": "string",
  "weight": "string",
  "stiffness": "string",
  "balance": "string",
  "playstyle": "string",
  "imageUrl": "string",
  "brandId": "integer",
  "brand": {
    "id": "integer",
    "name": "string",
    "slug": "string"
  },
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

**Response (404)**:
```json
{
  "error": "Product not found"
}
```

### POST /admin/products

Create new product (admin only, multipart/form-data).

**Headers**:
- `Authorization`: Bearer <token>
- `Content-Type`: multipart/form-data

**Form Fields**:
- `name` (string, required): Product name
- `series` (string, required): Product series
- `price` (string, required): Price
- `weight` (string, optional): Weight
- `stiffness` (string, optional): Stiffness
- `balance` (string, optional): Balance
- `playstyle` (string, optional): Playstyle
- `brandId` (integer, required): Brand ID
- `image` (file, optional): Product image (max 5MB, image/*)

**Response (201)**:
```json
{
  "id": "integer",
  "name": "string",
  "series": "string",
  "price": "string",
  "weight": "string",
  "stiffness": "string",
  "balance": "string",
  "playstyle": "string",
  "imageUrl": "string",
  "brandId": "integer",
  "brand": {
    "id": "integer",
    "name": "string",
    "slug": "string"
  },
  "uploaded": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### PUT /admin/products/{id}

Update product (admin only, multipart/form-data).

**Headers**:
- `Authorization`: Bearer <token>
- `Content-Type`: multipart/form-data

**Path Parameters**:
- `id` (integer): Product ID

**Form Fields** (all optional, provide only fields to update):
- `name` (string)
- `series` (string)
- `price` (string)
- `weight` (string)
- `stiffness` (string)
- `balance` (string)
- `playstyle` (string)
- `brandId` (integer)
- `image` (file, optional): New product image

**Response (200)**: Same as POST response

### DELETE /admin/products/{id}

Delete product (admin only).

**Headers**:
- `Authorization`: Bearer <token>

**Path Parameters**:
- `id` (integer): Product ID

**Response (200)**:
```json
{
  "ok": true
}
```

## Brands

### GET /brands

Retrieve all brands with product counts.

**Response (200)**:
```json
[
  {
    "id": "integer",
    "name": "string",
    "slug": "string",
    "_count": {
      "products": "integer"
    }
  }
]
```

### POST /admin/brands

Create new brand (admin only).

**Headers**:
- `Authorization`: Bearer <token>

**Request**:
```json
{
  "name": "string (required)",
  "slug": "string (optional, auto-generated from name)"
}
```

**Response (201)**:
```json
{
  "id": "integer",
  "name": "string",
  "slug": "string"
}
```

### PUT /admin/brands/{id}

Update brand (admin only).

**Headers**:
- `Authorization`: Bearer <token>

**Path Parameters**:
- `id` (integer): Brand ID

**Request**:
```json
{
  "name": "string (optional)",
  "slug": "string (optional)"
}
```

**Response (200)**: Same as POST response

### DELETE /admin/brands/{id}

Delete brand (admin only). Fails if brand has products.

**Headers**:
- `Authorization`: Bearer <token>

**Path Parameters**:
- `id` (integer): Brand ID

**Response (200)**:
```json
{
  "ok": true
}
```

**Response (400)**:
```json
{
  "error": "Thương hiệu này đang có sản phẩm, không thể xoá"
}
```

## Users

### GET /admin/users

Retrieve all users (admin only).

**Headers**:
- `Authorization`: Bearer <token>

**Response (200)**:
```json
[
  {
    "id": "integer",
    "email": "string",
    "name": "string",
    "role": "string",
    "createdAt": "datetime"
  }
]
```

### DELETE /admin/users/{id}

Delete user (admin only).

**Headers**:
- `Authorization`: Bearer <token>

**Path Parameters**:
- `id` (integer): User ID

**Response (200)**:
```json
{
  "ok": true
}
```

## Cart (New)

### GET /cart

Get current user's cart.

**Headers**:
- `Authorization`: Bearer <token> (customer)

**Response (200)**:
```json
{
  "id": "integer",
  "userId": "integer",
  "items": [
    {
      "id": "integer",
      "productId": "integer",
      "quantity": "integer",
      "priceAtTime": "string",
      "product": {
        "id": "integer",
        "name": "string",
        "price": "string",
        "imageUrl": "string"
      }
    }
  ],
  "totalAmount": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### POST /cart/items

Add item to cart.

**Headers**:
- `Authorization`: Bearer <token> (customer)

**Request**:
```json
{
  "productId": "integer",
  "quantity": "integer (default: 1)"
}
```

**Response (201)**: Cart object

### DELETE /cart/items/{itemId}

Remove item from cart.

**Headers**:
- `Authorization`: Bearer <token> (customer)

**Path Parameters**:
- `itemId` (integer): Cart item ID

**Response (200)**:
```json
{
  "ok": true
}
```

## Orders (New)

### POST /orders

Create order from cart.

**Headers**:
- `Authorization`: Bearer <token> (customer)

**Request**:
```json
{
  "shippingAddress": "string",
  "paymentMethod": "string"
}
```

**Response (201)**:
```json
{
  "id": "integer",
  "userId": "integer",
  "totalAmount": "string",
  "status": "pending",
  "items": [
    {
      "id": "integer",
      "productId": "integer",
      "quantity": "integer",
      "priceAtTime": "string",
      "product": {
        "id": "integer",
        "name": "string",
        "price": "string",
        "imageUrl": "string"
      }
    }
  ],
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### GET /orders/{id}

Get order details.

**Headers**:
- `Authorization`: Bearer <token> (customer)

**Path Parameters**:
- `id` (integer): Order ID

**Response (200)**: Order object

## Statistics

### GET /admin/stats

Get admin statistics (admin only).

**Headers**:
- `Authorization`: Bearer <token>

**Response (200)**:
```json
{
  "totalProducts": "integer",
  "totalBrands": "integer",
  "totalSeries": "integer",
  "topBrands": "array"
}
```

### GET /public/stats

Get public statistics (no auth required).

**Response (200)**: Same as admin stats

## AI Chatbot

### POST /chat

Process chat message through AI.

**Headers**:
- `Authorization`: Bearer <token> (optional for public)

**Request**:
```json
{
  "message": "string",
  "conversationId": "string (optional)",
  "context": "object (optional)"
}
```

**Response (200)**:
```json
{
  "response": "string",
  "conversationId": "string",
  "recommendations": [
    {
      "productId": "integer",
      "name": "string",
      "price": "string",
      "imageUrl": "string",
      "description": "string"
    }
  ]
}
```

## Validation Rules

- All required fields must be provided
- Prices must be valid numeric strings
- Email addresses must be valid format
- JWT tokens must be valid and not expired
- File uploads must be image/* and under 5MB
- Quantity must be positive integer
- Order status must be one of: pending, completed, cancelled

## Rate Limiting

- Chat endpoint: 30 requests/minute per IP
- Admin endpoints: 100 requests/minute per IP
- Public endpoints: 60 requests/minute per IP