# IZAM E-Commerce Platform

A modern e-commerce application built with Laravel and React, featuring a product catalog, shopping cart, user authentication, order management, and admin dashboard.

## Features

- User authentication and registration
- Product browsing with filtering and search
- Shopping cart functionality
- Order placement and tracking
- Admin panel for managing products, categories, and orders
- Real-time order notifications
- Responsive design for mobile and desktop

## Requirements

- PHP 8.2+
- Composer
- Node.js & npm
- MySQL or compatible database

## Installation and Setup

### Clone the repository

```bash
git clone https://github.com/Mgahed/izam-ecommerce-test
cd izam
```

### Install PHP dependencies

```bash
composer install
```

### Install JavaScript dependencies

```bash
npm install
```

### Configure environment

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Generate application key:
```bash
php artisan key:generate
```

3. Configure your database in the `.env` file:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=izam_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

4. Configure mail settings in the `.env` file for order notifications:
```
MAIL_MAILER=smtp
MAIL_HOST=your_mail_host
MAIL_PORT=2525
MAIL_USERNAME=your_mail_username
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@example.com"
MAIL_FROM_NAME="${APP_NAME}"
MAIL_ADMIN_ADDRESS="admin@example.com"
```

### Run migrations and seed the database

```bash
php artisan migrate --seed
```

This will:
- Create all necessary database tables
- Seed the database with sample products, categories, and an admin user
- Default admin credentials: email: `admin@example.com`, password: `adminpassword`
- Normal user credentials: email: `test@example.com`, password: `password`

## Running the Application

### Build Production Assets

For production:
```bash
npm run build
```

### Development Mode

Run the application in development mode with hot-reloading:

**Option 1: Using separate terminals**
```bash
# Terminal 1: Start Laravel server
php artisan serve

# Terminal 2: Start Vite development server
npm run dev

# Terminal 3 (optional): Queue worker for background processing
php artisan queue:work
```

**Option 2: Using the built-in dev command**
```bash
composer dev
```
This command will run Laravel server, Vite server, and queue worker concurrently.

## Application Architecture

The application is built using:
- **Backend**: Laravel 12+ (PHP Framework)
- **Frontend**: React with Redux (JavaScript Library)
- **API**: RESTful API with Laravel Sanctum for authentication
- **Database**: MySQL

### Backend (Laravel)

The backend is responsible for:
- Database operations
- Authentication
- Business logic
- API endpoints
- Event handling

### Frontend (React)

The frontend is a single-page application that:
- Consumes the API endpoints
- Manages state using Redux
- Handles user interface and interactions
- Manages routing using React Router

## Authentication Flow

The application uses Laravel Sanctum for token-based authentication:

1. **Registration**:
   - User submits name, email, and password
   - Server validates the data and creates a new user account
   - Server generates and returns an authentication token

2. **Login**:
   - User submits email and password
   - Server verifies credentials
   - If valid, server generates and returns a new authentication token

3. **Authenticated Requests**:
   - The token must be included in the Authorization header of all authenticated requests
   - Format: `Authorization: Bearer {token}`

4. **Logout**:
   - Send a POST request to `/api/logout` with the auth token
   - The token will be invalidated on the server

5. **Admin Authentication**:
   - Uses the same flow as regular users
   - Admin access is determined by user roles/permissions in the database

## Overview Documentation

For a more in-depth understanding of the system architecture, flows, and implementation details, refer to the [Documentation](http://izamtest.mgahed.com/docs/docs.html) section.

## API Documentation

The API is documented using OpenAPI/Swagger specification. You can access the interactive API documentation at:

https://izamtest.mgahed.com/api/documentation


Or you can view the raw specification file at:

https://izamtest.mgahed.com/api-docs.yaml

### API Endpoints Overview

#### Authentication Endpoints

| Method | Endpoint     | Description                           | Auth Required |
|--------|--------------|---------------------------------------|---------------|
| POST   | /api/register | Register a new user                  | No            |
| POST   | /api/login    | Login with email and password        | No            |
| POST   | /api/logout   | Logout and invalidate token          | Yes           |
| GET    | /api/me       | Get current authenticated user       | Yes           |

#### Product Endpoints

| Method | Endpoint               | Description                   | Auth Required |
|--------|------------------------|-------------------------------|---------------|
| GET    | /api/products          | Get paginated products list   | No            |
| GET    | /api/products/{id}     | Get a specific product        | No            |

#### Category Endpoints

| Method | Endpoint               | Description                   | Auth Required |
|--------|------------------------|-------------------------------|---------------|
| GET    | /api/categories        | Get all categories            | No            |

#### Order Endpoints

| Method | Endpoint               | Description                   | Auth Required |
|--------|------------------------|-------------------------------|---------------|
| GET    | /api/orders            | Get user's orders             | Yes           |
| POST   | /api/orders            | Create a new order            | Yes           |
| GET    | /api/orders/{id}       | Get a specific order          | Yes           |

#### Admin Endpoints

| Method | Endpoint                       | Description                | Auth Required |
|--------|--------------------------------|----------------------------|---------------|
| GET    | /api/admin/products            | Get all products           | Yes (Admin)   |
| POST   | /api/admin/products            | Create a product           | Yes (Admin)   |
| GET    | /api/admin/products/{id}       | Get a specific product     | Yes (Admin)   |
| PUT    | /api/admin/products/{id}       | Update a product           | Yes (Admin)   |
| DELETE | /api/admin/products/{id}       | Delete a product           | Yes (Admin)   |
| GET    | /api/admin/categories          | Get all categories         | Yes (Admin)   |
| POST   | /api/admin/categories          | Create a category          | Yes (Admin)   |
| GET    | /api/admin/categories/{id}     | Get a specific category    | Yes (Admin)   |
| PUT    | /api/admin/categories/{id}     | Update a category          | Yes (Admin)   |
| DELETE | /api/admin/categories/{id}     | Delete a category          | Yes (Admin)   |
| GET    | /api/admin/orders              | Get all orders             | Yes (Admin)   |
| GET    | /api/admin/orders/{id}         | Get a specific order       | Yes (Admin)   |
| PATCH  | /api/admin/orders/{id}/status  | Update order status        | Yes (Admin)   |

For detailed information about request/response formats, required parameters, and authentication requirements, please refer to the Swagger documentation.

## Usage

### Customer Portal

1. Register a new account or login with existing credentials
2. Browse products by category or use search/filters
3. Add products to cart
4. Checkout and place order
5. View order history and status

### Admin Features (through postman or swagger only)

1. Login with admin credentials (default: admin@example.com / adminpassword)
2. Manage products: add, edit, delete
3. Manage categories
4. View and update order statuses
