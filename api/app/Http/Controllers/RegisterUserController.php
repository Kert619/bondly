<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;
use App\Models\UserProfile;

class RegisterUserController extends Controller
{
    public function __invoke(RegisterUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'birth_date' => $validated['birth_date'],
        ]);

        $token = $user->createToken('Token for user ' . $user->id);

        return ['token' => $token->plainTextToken];
    }
}
