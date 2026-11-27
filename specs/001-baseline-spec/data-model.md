# Data Model Specification

## Entities

### Brand
- **name**: String - Manufacturer name
- **slug**: String - Unique slug identifier
- **products**: Relation to Product (one-to-many)

### Product
- **name**: String - Product name
- **series**: String - Product series/collection
- **price**: String - Price in currency format
- **weight**: String - Weight specification
- **stiffness**: String - Stiffness rating
- **balance**: String - Balance point specification
- **playstyle**: String - Playing style (offensive/defensive/balanced)
- **imageUrl**: String - URL to product image
- **brandId**: int - Foreign key to Brand
- **brand**: Relation to Brand
- **createdAt**: DateTime - Creation timestamp
- **updatedAt**: DateTime - Last update timestamp

### User
- **email**: String - Unique email address
- **name**: String - Optional full name
- **password**: String - Hashed password
- **role**: String - User role (customer/admin)
- **cart**: Relation to Cart (one-to-one)
- **orders**: Relation to Order (one-to-many)
- **createdAt**: DateTime - Account creation timestamp
- **updatedAt**: DateTime - Last activity timestamp

### Cart
- **userId**: int - Foreign key to User
- **items**: Array of CartItem
- **createdAt**: DateTime - Cart creation timestamp
- **updatedAt**: DateTime - Last update timestamp

### CartItem
- **productId**: int - Foreign key to Product
- **quantity**: int - Quantity of item
- **priceAtTime**: String - Price at time of addition (snapshot)

### Order
- **userId**: int - Foreign key to User
- **totalAmount**: String - Total order amount
- **status**: String - Order status (pending/completed/cancelled)
- **createdAt**: DateTime - Order creation timestamp
- **updatedAt**: DateTime - Last update timestamp
- **items**: Array of OrderItem

### OrderItem
- **productId**: int - Foreign key to Product
- **quantity**: int - Quantity purchased
- **priceAtTime**: String - Price at time of purchase (snapshot)
- **shippedAt**: DateTime - Shipment timestamp (nullable)

## Relationships

- Brand 1 -- * Product
- Product 1 -- * CartItem
- User 1 -- 1 Cart
- User 1 -- * Order
- User 1 -- * OrderItem
- Product 1 -- * OrderItem
- Order 1 -- * OrderItem