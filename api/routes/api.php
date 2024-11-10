<?php

use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//public routes
Route::post('/register', RegisterUserController::class);

//protected routes
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/user', [UserController::class, 'getUser'])->withoutMiddleware(['verified']);
});
