<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Routing\Controller;

class RegisterUserController extends Controller
{
    public function __invoke(RegisterUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'email' => $validated['email'],
            'password' => $validated['password']
        ]);

        $userProfile =  UserProfile::create([
            'user_id' => $user->id,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'birth_date' => $validated['birth_date']
        ]);


        $deviceName = $validated['device_name'] ?? 'Token for user ID ' . $user->id;

        $token = $user->createToken($deviceName)->plainTextToken;

        event(new Registered($user));

        return response()->json([
            'message' => 'User registered successfully. Please verify your email.',
            'token' => $token,
            'user' => $user,
            'user_profile' => $userProfile
        ], 201);
    }
}
