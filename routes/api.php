<?php

use App\Http\Middleware\AdminMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ShopSettingsController;
use App\Http\Controllers\Api\Admin\AdminProductController;
use App\Http\Controllers\Api\Admin\AdminCategoryController;
use App\Http\Controllers\Api\Admin\AdminOrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Categories
Route::get('/categories', [CategoryController::class, 'index']);

// Shop Settings (public)
Route::get('/settings', [ShopSettingsController::class, 'getSettings']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    // User routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Order routes
    Route::apiResource('/orders', OrderController::class);

    // Admin routes
    Route::middleware(AdminMiddleware::class)->prefix('admin')->group(function () {
        // Admin Product Management
        Route::apiResource('/products', AdminProductController::class);

        // Admin Category Management
        Route::apiResource('/categories', AdminCategoryController::class);

        // Admin Order Management
        Route::apiResource('/orders', AdminOrderController::class);
        Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus']);
    });
});
