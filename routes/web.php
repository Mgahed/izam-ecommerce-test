<?php

use Illuminate\Support\Facades\Route;

// Public routes
//Route::get('/', function () {
//    return view('welcome');
//});

// Swagger documentation
Route::get('/api/documentation', function () {
    return view('swagger');
});

// All routes will be handled by the React app
Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');
