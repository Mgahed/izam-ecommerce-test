# IZAM E-Commerce System Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [System Architecture](#system-architecture)
3. [Database Schema](#database-schema)
4. [Authentication Flows](#authentication-flows)
5. [Product Management Flows](#product-management-flows)
6. [Shopping Cart Flow](#shopping-cart-flow)
7. [Order Processing Flow](#order-processing-flow)
8. [Admin Management Flows](#admin-management-flows)
9. [Notification System](#notification-system)
10. [API Integration](#api-integration)
11. [Security Implementation](#security-implementation)

---

## System Overview

IZAM is a modern e-commerce platform built with Laravel 12 and React. The system provides a seamless shopping experience for customers while offering robust management capabilities for administrators. 

### Key Features

- User registration and authentication
- Product browsing and filtering
- Shopping cart management
- Order placement and tracking
- Admin product management
- Admin category management
- Admin order management
- Real-time order notifications
- RESTful API with comprehensive documentation

### User Roles

1. **Guest Users**: Can browse products and categories without authentication
2. **Registered Users**: Can place orders and track order history
3. **Admin Users**: Have access to the admin dashboard for managing products, categories, and orders

---

## System Architecture

### High-Level Architecture

The IZAM platform follows a client-server architecture with a clear separation between frontend and backend:

```
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│               │         │               │         │               │
│  React        │ ◄─────► │  Laravel API  │ ◄─────► │  MySQL        │
│  Frontend     │   REST  │  Backend      │   SQL   │  Database     │
│               │   API   │               │  Queries│               │
└───────────────┘         └───────────────┘         └───────────────┘
                                 │
                                 │ SMTP
                                 ▼
                          ┌───────────────┐
                          │               │
                          │  Email        │
                          │  Service      │
                          │               │
                          └───────────────┘
```

### Backend Architecture (Laravel)

The backend follows Laravel's MVC (Model-View-Controller) architecture:

- **Models**: Represent database tables and relationships
- **Controllers**: Handle API requests and business logic
- **Middleware**: Process requests before reaching controllers
- **Events & Listeners**: Handle asynchronous processes like notifications
- **Services**: Contain reusable business logic
- **Routes**: Define API endpoints

### Frontend Architecture (React)

The frontend is built as a Single Page Application (SPA) with React:

- **Redux**: For global state management
- **React Router**: For client-side routing
- **Components**: Reusable UI elements
- **Pages**: Main application views
- **Services**: Handle API communication
- **Hooks**: Custom logic for components

### Communication Flow

1. React frontend makes API requests to Laravel backend
2. Laravel processes requests through middleware and controllers
3. Controllers interact with models to retrieve or modify data
4. Models communicate with the MySQL database
5. Laravel sends responses back to the React frontend
6. React updates the UI based on responses

---

## Database Schema

### Core Tables

1. **users**
   - id (PK)
   - name
   - email
   - password (hashed)
   - is_admin (boolean)
   - created_at
   - updated_at

2. **products**
   - id (PK)
   - name
   - description
   - price
   - stock_quantity
   - image_path
   - category_id (FK)
   - created_at
   - updated_at

3. **categories**
   - id (PK)
   - name
   - created_at
   - updated_at

4. **orders**
   - id (PK)
   - user_id (FK)
   - total
   - status (enum: pending, processing, completed, cancelled)
   - created_at
   - updated_at

5. **order_product** (Pivot table)
   - id (PK)
   - order_id (FK)
   - product_id (FK)
   - quantity
   - price (price at time of purchase)
   - created_at
   - updated_at

6. **personal_access_tokens** (For Sanctum)
   - id (PK)
   - tokenable_type
   - tokenable_id
   - name
   - token (hashed)
   - abilities
   - last_used_at
   - created_at
   - updated_at

### Relationships

- A **User** can have many **Orders**
- A **Category** can have many **Products**
- A **Product** can belong to one **Category**
- An **Order** belongs to one **User**
- An **Order** can have many **Products** (through the pivot table)
- A **Product** can be part of many **Orders** (through the pivot table)

---

## Authentication Flows

### Registration Flow

1. **Client-Side Validation**
   - User enters name, email, password, and confirms password
   - React validates input format client-side (email format, password length, etc.)

2. **API Request**
   - React sends a POST request to `/api/register` with:
     ```json
     {
       "name": "User Name",
       "email": "user@example.com",
       "password": "password123",
       "password_confirmation": "password123"
     }
     ```

3. **Server-Side Processing**
   - Laravel receives request at `AuthController@register`
   - Validates input against server-side rules
   - Checks if email is already in use
   - Creates new user record with hashed password
   - Generates new Sanctum token

4. **Response**
   - Server returns HTTP 201 with:
     ```json
     {
       "user": {
         "id": 1,
         "name": "User Name",
         "email": "user@example.com",
         "created_at": "2023-01-01T00:00:00.000000Z",
         "updated_at": "2023-01-01T00:00:00.000000Z"
       },
       "token": "1|abcdefghijklmnopqrstuvwxyz1234567890"
     }
     ```

5. **Client-Side Completion**
   - React stores token in localStorage
   - Redux updates authentication state
   - User is redirected to home page or previous page

### Login Flow

1. **Client-Side Validation**
   - User enters email and password
   - React validates input format client-side

2. **API Request**
   - React sends a POST request to `/api/login` with:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```

3. **Server-Side Processing**
   - Laravel receives request at `AuthController@login`
   - Validates input against server-side rules
   - Attempts to authenticate with provided credentials
   - If successful, creates a new Sanctum token
   - If unsuccessful, returns error

4. **Response (Success)**
   - Server returns HTTP
     ```json
     {
       "user": {
         "id": 1,
         "name": "User Name",
         "email": "user@example.com",
         "created_at": "2023-01-01T00:00:00.000000Z",
         "updated_at": "2023-01-01T00:00:00.000000Z"
       },
       "token": "1|abcdefghijklmnopqrstuvwxyz1234567890"
     }
     ```

5. **Response (Failure)**
   - Server returns HTTP 401 with:
     ```json
     {
       "message": "Invalid credentials"
     }
     ```

6. **Client-Side Completion**
   - React stores token in localStorage on success
   - Redux updates authentication state
   - User is redirected to home page or previous page

### Logout Flow

1. **API Request**
   - React sends a POST request to `/api/logout` with token in Authorization header:
     ```
     Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz1234567890
     ```

2. **Server-Side Processing**
   - Laravel receives request at `AuthController@logout`
   - Verifies token through Sanctum middleware
   - Deletes the current token

3. **Response**
   - Server returns HTTP 200 with:
     ```json
     {
       "message": "Logged out successfully"
     }
     ```

4. **Client-Side Completion**
   - React removes token from localStorage
   - Redux updates authentication state
   - User is redirected to login page

### Authentication Middleware Flow

1. **API Request with Token**
   - React includes token in all authenticated requests:
     ```
     Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz1234567890
     ```

2. **Sanctum Middleware**
   - Laravel's `auth:sanctum` middleware intercepts the request
   - Extracts token from header
   - Validates token against database
   - Attaches authenticated user to request

3. **Admin Middleware Flow**
   - For admin-only routes, additional `AdminMiddleware` is applied
   - Checks if authenticated user has admin privileges
   - If not admin, returns 403 Forbidden

---

## Product Management Flows

### Product Listing Flow

1. **API Request**
   - React sends GET request to `/api/products` with optional query parameters:
     - `name`: Filter by product name
     - `min_price`: Minimum price filter
     - `max_price`: Maximum price filter
     - `category_id`: Filter by category
     - `page`: Page number for pagination
     - `per_page`: Number of products per page

2. **Server-Side Processing**
   - Laravel receives request at `ProductController@index`
   - Builds query based on filter parameters
   - Retrieves products from database
   - Paginates results

3. **Cache Integration**
   - Controller checks if results for this query exist in cache
   - If cached, returns cached results
   - If not cached, stores results in cache for 10 minutes

4. **Response**
   - Server returns HTTP 200 with paginated products:
     ```json
     {
       "data": [
         {
           "id": 1,
           "name": "Product Name",
           "description": "Product description",
           "price": "99.99",
           "stock_quantity": 50,
           "image_path": "/images/products/1.png",
           "category_id": 1,
           "created_at": "2023-01-01T00:00:00.000000Z",
           "updated_at": "2023-01-01T00:00:00.000000Z",
           "category": {
             "id": 1,
             "name": "Category Name",
             "created_at": "2023-01-01T00:00:00.000000Z",
             "updated_at": "2023-01-01T00:00:00.000000Z"
           }
         },
         // additional products...
       ],
       "links": {
         "first": "https://izamtest.mgahed.com/api/products?page=1",
         "last": "https://izamtest.mgahed.com/api/products?page=10",
         "prev": null,
         "next": "https://izamtest.mgahed.com/api/products?page=2"
       },
       "meta": {
         "current_page": 1,
         "from": 1,
         "last_page": 10,
         "path": "https://izamtest.mgahed.com/api/products",
         "per_page": 10,
         "to": 10,
         "total": 100
       }
     }
     ```

5. **Client-Side Processing**
   - React receives product data
   - Updates Redux store
   - Renders product list
   - Implements client-side pagination controls

### Product Detail Flow

1. **API Request**
   - React sends GET request to `/api/products/{id}`

2. **Server-Side Processing**
   - Laravel receives request at `ProductController@show`
   - Retrieves product by ID
   - Loads related category

3. **Response**
   - Server returns HTTP 200 with product details:
     ```json
     {
       "id": 1,
       "name": "Product Name",
       "description": "Product description",
       "price": "99.99",
       "stock_quantity": 50,
       "image_path": "/images/products/1.png",
       "category_id": 1,
       "created_at": "2023-01-01T00:00:00.000000Z",
       "updated_at": "2023-01-01T00:00:00.000000Z",
       "category": {
         "id": 1,
         "name": "Category Name",
         "created_at": "2023-01-01T00:00:00.000000Z",
         "updated_at": "2023-01-01T00:00:00.000000Z"
       }
     }
     ```

4. **Client-Side Processing**
   - React receives product data
   - Updates Redux store
   - Renders product detail page

### Admin Product Creation Flow

1. **API Request**
   - React sends POST request to `/api/admin/products` with:
     ```json
     {
       "name": "New Product",
       "description": "Product description",
       "price": 99.99,
       "stock_quantity": 50,
       "category_id": 1
     }
     ```

2. **Server-Side Processing**
   - Laravel verifies admin through middleware
   - Receives request at `AdminProductController@store`
   - Validates input
   - Creates new product record

3. **Cache Clearing**
   - After creation, product cache is cleared to ensure fresh data

4. **Response**
   - Server returns HTTP 201 with created product:
     ```json
     {
       "id": 101,
       "name": "New Product",
       "description": "Product description",
       "price": "99.99",
       "stock_quantity": 50,
       "image_path": null,
       "category_id": 1,
       "created_at": "2023-01-01T00:00:00.000000Z",
       "updated_at": "2023-01-01T00:00:00.000000Z"
     }
     ```

### Admin Product Update Flow

1. **API Request**
   - React sends PUT request to `/api/admin/products/{id}` with:
     ```json
     {
       "name": "Updated Product Name",
       "price": 89.99,
       "stock_quantity": 40
     }
     ```

2. **Server-Side Processing**
   - Laravel verifies admin through middleware
   - Receives request at `AdminProductController@update`
   - Validates input
   - Updates product record

3. **Cache Clearing**
   - After update, product cache is cleared to ensure fresh data

4. **Response**
   - Server returns HTTP 200 with updated product:
     ```json
     {
       "id": 101,
       "name": "Updated Product Name",
       "description": "Product description",
       "price": "89.99",
       "stock_quantity": 40,
       "image_path": null,
       "category_id": 1,
       "created_at": "2023-01-01T00:00:00.000000Z",
       "updated_at": "2023-01-02T00:00:00.000000Z"
     }
     ```

### Admin Product Deletion Flow

1. **API Request**
   - React sends DELETE request to `/api/admin/products/{id}`

2. **Server-Side Processing**
   - Laravel verifies admin through middleware
   - Receives request at `AdminProductController@destroy`
   - Checks if product has associated orders
   - If no orders, deletes the product
   - If has orders, returns error

3. **Cache Clearing**
   - After deletion, product cache is cleared to ensure fresh data

4. **Response (Success)**
   - Server returns HTTP 204 (No Content)

5. **Response (Failure)**
   - Server returns HTTP 422 with:
     ```json
     {
       "message": "Cannot delete product. It is associated with one or more orders."
     }
     ```

---

## Shopping Cart Flow

### Cart Implementation

The shopping cart is implemented client-side using Redux for state management and localStorage for persistence.

1. **Cart Structure**
   ```javascript
   {
     items: [
       {
         id: 1,           // Product ID
         name: "Product", // Product Name
         price: 99.99,    // Product Price
         quantity: 2,     // Quantity in cart
         image: "/path"   // Product image
       },
       // more products...
     ],
     total: 199.98        // Cart total
   }
   ```

### Add to Cart Flow

1. **User Action**
   - User clicks "Add to Cart" on product page
   - Optionally selects quantity

2. **Client-Side Processing**
   - React dispatches Redux action `addToCart`
   - Reducer adds product to cart or increments quantity
   - Updates cart total
   - Saves cart to localStorage

3. **UI Updates**
   - Cart icon updates with new quantity
   - Toast notification confirms addition
   - Cart sidebar updates (if open)

### Update Cart Item Flow

1. **User Action**
   - User changes quantity in cart
   - User clicks update button

2. **Client-Side Processing**
   - React dispatches Redux action `updateCartItem`
   - Reducer updates item quantity
   - Recalculates cart total
   - Saves cart to localStorage

3. **UI Updates**
   - Cart totals and quantities update
   - Product subtotal updates

### Remove from Cart Flow

1. **User Action**
   - User clicks "Remove" icon on cart item

2. **Client-Side Processing**
   - React dispatches Redux action `removeFromCart`
   - Reducer removes item from cart
   - Recalculates cart total
   - Saves cart to localStorage

3. **UI Updates**
   - Item disappears from cart
   - Cart totals update
   - Cart icon quantity updates

### Cart Persistence

1. **Saving Cart**
   - Cart is saved to localStorage on every change:
     ```javascript
     localStorage.setItem('cart', JSON.stringify(cartState));
     ```

2. **Loading Cart**
   - On application startup, cart is loaded from localStorage:
     ```javascript
     const savedCart = JSON.parse(localStorage.getItem('cart'));
     ```
   - Redux store is initialized with saved cart data

3. **Cart Clearing**
   - Cart is cleared after successful order placement
   - Cart is preserved across page refreshes

---

## Order Processing Flow

### Checkout Flow

1. **Checkout Initialization**
   - User reviews cart and clicks "Checkout"
   - System checks if user is authenticated
   - If not authenticated, redirects to login page with return URL

2. **Order Summary Review**
   - User reviews order summary including:
     - Products and quantities
     - Individual prices
     - Subtotal
     - Total

3. **Checkout Submission**
   - User confirms order by clicking "Place Order"
   - React formats cart data for API request

4. **API Request**
   - React sends POST request to `/api/orders` with:
     ```json
     {
       "products": [
         {
           "id": 1,
           "quantity": 2
         },
         {
           "id": 3,
           "quantity": 1
         }
       ]
     }
     ```

5. **Server-Side Processing**
   - Laravel receives request at `OrderController@store`
   - Starts a database transaction
   - For each product:
     - Locks the product record for update
     - Checks stock availability
     - Calculates item price
     - Reduces product stock
   - Creates order record with calculated total
   - Attaches products to order with pivot data
   - Fires `OrderPlaced` event
   - Commits the transaction

6. **Response**
   - Server returns HTTP 201 with:
     ```json
     {
       "message": "Order placed successfully",
       "order": {
         "id": 1,
         "user_id": 1,
         "total": "129.97",
         "status": "pending",
         "created_at": "2023-01-01T00:00:00.000000Z",
         "updated_at": "2023-01-01T00:00:00.000000Z",
         "products": [
           {
             "id": 1,
             "name": "Product Name",
             "pivot": {
               "quantity": 2,
               "price": "99.99"
             }
           },
           {
             "id": 3,
             "name": "Other Product",
             "pivot": {
               "quantity": 1,
               "price": "29.99"
             }
           }
         ]
       }
     }
     ```

7. **Client-Side Completion**
   - React clears the cart
   - Shows order confirmation
   - Redirects to order details page

### Order Event Processing

1. **Event Dispatch**
   - `OrderPlaced` event is fired with order data

2. **Event Listeners**
   - `SendOrderNotification` listener is triggered
   - Sends notifications to admin
   - Sends confirmation to customer

### Order Cancellation Flow

1. **API Request**
   - React sends DELETE request to `/api/orders/{id}`

2. **Server-Side Processing**
   - Laravel receives request at `OrderController@destroy`
   - Verifies that order belongs to authenticated user
   - Checks if order status is "pending"
   - For each product in the order:
     - Restores the original stock quantity
   - Updates order status to "cancelled"

3. **Response**
   - Server returns HTTP 200 with:
     ```json
     {
       "message": "Order cancelled successfully"
     }
     ```

4. **Client-Side Completion**
   - React updates order status in UI
   - Shows cancellation confirmation

---

## Admin Management Flows

### Admin Order Management Flow

1. **Order Listing**
   - Admin accesses orders section in dashboard
   - React sends GET request to `/api/admin/orders` with optional filters:
     - `status`: Filter by order status
     - `user_id`: Filter by customer
     - `page`: Page number for pagination

2. **Server-Side Processing**
   - Laravel verifies admin through middleware
   - Receives request at `AdminOrderController@index`
   - Retrieves orders with filters
   - Loads related users and products

3. **Response**
   - Server returns HTTP 200 with paginated orders:
     ```json
     {
       "data": [
         {
           "id": 1,
           "user_id": 1,
           "total": "129.97",
           "status": "pending",
           "created_at": "2023-01-01T00:00:00.000000Z",
           "updated_at": "2023-01-01T00:00:00.000000Z",
           "user": {
             "id": 1,
             "name": "User Name",
             "email": "user@example.com"
           },
           "products": [
             {
               "id": 1,
               "name": "Product Name",
               "pivot": {
                 "quantity": 2,
                 "price": "99.99"
               }
             }
           ]
         },
         // more orders...
       ],
       // pagination links and meta...
     }
     ```

### Admin Order Status Update Flow

1. **Status Update Request**
   - Admin selects new status for order
   - React sends PATCH request to `/api/admin/orders/{order}/status` with:
     ```json
     {
       "status": "processing"
     }
     ```

2. **Server-Side Processing**
   - Laravel verifies admin through middleware
   - Receives request at `AdminOrderController@updateStatus`
   - Validates status is one of: pending, processing, completed, cancelled
   - Updates order status

3. **Response**
   - Server returns HTTP 200 with updated order:
     ```json
     {
       "id": 1,
       "user_id": 1,
       "total": "129.97",
       "status": "processing",
       "created_at": "2023-01-01T00:00:00.000000Z",
       "updated_at": "2023-01-02T00:00:00.000000Z",
       // other order data...
     }
     ```

### Admin Category Management Flow

1. **Category Creation**
   - Admin enters category name
   - React sends POST request to `/api/admin/categories` with:
     ```json
     {
       "name": "New Category"
     }
     ```

2. **Server-Side Processing**
   - Laravel verifies admin through middleware
   - Receives request at `AdminCategoryController@store`
   - Validates category name
   - Creates new category

3. **Response**
   - Server returns HTTP 201 with created category:
     ```json
     {
       "id": 5,
       "name": "New Category",
       "created_at": "2023-01-01T00:00:00.000000Z",
       "updated_at": "2023-01-01T00:00:00.000000Z"
     }
     ```

---

## Notification System

### Email Notification Flow

1. **Event Triggering**
   - `OrderPlaced` event is fired after order creation

2. **Listener Activation**
   - `SendOrderNotification` listener is activated
   - Receives the order data

3. **Admin Notification**
   - Creates `OrderPlacedMail` instance for admin
   - Sends email to admin address configured in `.env`

4. **Customer Notification**
   - Checks if user has email address
   - Creates `OrderPlacedMail` instance for customer
   - Sends email to customer's email address

5. **Email Content**
   - Order confirmation email includes:
     - Order number
     - Order date
     - Order status
     - Product details
     - Quantity and prices
     - Total amount

### Queue Processing

1. **Queue Configuration**
   - Notifications are processed through Laravel's queue system
   - Queue driver is configured in `.env`

2. **Dispatching to Queue**
   - `SendOrderNotification` implements `ShouldQueue`
   - Laravel automatically dispatches listener to queue

3. **Processing Queue**
   - Queue worker processes the job:
     ```bash
     php artisan queue:work
     ```

4. **Failed Jobs Handling**
   - If email sending fails, job is retried
   - After maximum retries, job is moved to failed jobs table

---

## API Integration

### API Authentication

1. **Token-Based Authentication**
   - Laravel Sanctum generates and validates tokens
   - Tokens are included in HTTP Headers:
     ```
     Authorization: Bearer {token}
     ```

2. **Token Scopes and Abilities**
   - Tokens can be configured with specific abilities
   - Admin routes require admin privileges

### Cross-Origin Resource Sharing (CORS)

1. **CORS Configuration**
   - Laravel CORS middleware enables cross-origin requests
   - Configured in `config/cors.php`
   - Allows specific origins, methods, and headers

### API Versioning

1. **Version Management**
   - API version is specified in URL: `/api/v1/...`
   - Allows for future API changes without breaking existing clients

### Error Handling

1. **Error Response Format**
   - All API errors follow consistent format:
     ```json
     {
       "message": "Error message",
       "errors": {
         "field": [
           "Error reason 1",
           "Error reason 2"
         ]
       }
     }
     ```

2. **HTTP Status Codes**
   - 200: Successful request
   - 201: Resource created
   - 204: No content (successful deletion)
   - 400: Bad request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not found
   - 422: Validation error
   - 500: Server error

---

## Security Implementation

### Authentication Security

1. **Password Hashing**
   - Passwords are hashed using bcrypt
   - Laravel automatically handles password hashing and verification

2. **Token Management**
   - Tokens are securely stored in database
   - Token hashing prevents exposure
   - Token expiration can be configured

### API Security

1. **Input Validation**
   - All API requests are validated before processing
   - Laravel's validation system prevents invalid data

2. **CSRF Protection**
   - Cross-Site Request Forgery protection is enabled
   - Sanctum handles CSRF protection for API requests

3. **Rate Limiting**
   - API rate limiting prevents abuse
   - Configured in RouteServiceProvider

### Data Security

1. **SQL Injection Prevention**
   - Laravel's query builder and Eloquent use prepared statements
   - Parameters are automatically escaped

2. **XSS Prevention**
   - React automatically escapes output
   - Laravel escapes HTML in responses

3. **Data Validation**
   - Server-side validation ensures data integrity
   - Type casting prevents unexpected data types

---

This document provides a comprehensive overview of the IZAM E-Commerce System's architecture, flows, and implementation details. For technical specifications and code examples, refer to the codebase and API documentation. 
