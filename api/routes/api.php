<?php

use App\Http\Controllers\Auth\ImageKitController;
use App\Http\Controllers\Auth\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/user', [UserController::class, 'getUser'])->withoutMiddleware(['verified']);
    Route::get('/imagekit/auth', [ImageKitController::class, 'auth']);
});
