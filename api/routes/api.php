<?php

use App\Http\Controllers\LoginUserController;
use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//public routes
Route::post('/register', RegisterUserController::class);
Route::post('/login', LoginUserController::class);

//protected routes
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/user', [UserController::class, 'getUser'])->withoutMiddleware(['verified']);
});
