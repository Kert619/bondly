<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Auth\Events\Registered;

class RegisterUserController extends Controller
{
    public function __invoke(RegisterUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'email' => $validated['email'],
            'password' => $validated['password']
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'birth_date' => $validated['birth_date']
        ]);

        event(new Registered($user));

        $token = $user->createToken($validated['device_name'])->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully. Please verify your email.',
            'token' => $token,
        ], 201);
    }
}
