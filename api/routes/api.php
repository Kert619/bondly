<?php

use App\Http\Controllers\RegisterUserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//public routes
Route::post('/register', RegisterUserController::class);

Route::get('/email/verify', function () {
    return response()->json(['message' => 'Please verify your email first'], 403);
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function ($id, $hash) {
    $user = User::query()->findOrFail($id);

    if (!hash_equals(sha1($user->getEmailForVerification()), (string) $hash)) {
        return response()->json(['message' => 'Invalid or expired verification link'], 403);
    }

    if (!$user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
    }

    return view('mail.already_verified');
})->middleware(['signed'])->name('verification.verify');

//protected routes
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
