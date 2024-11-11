<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginUserRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Auth;

class LoginUserController extends Controller
{
    public function __invoke(LoginUserRequest $request)
    {

        $validated = $request->validated();
        $deviceName = $validated['device_name'] ?? null;
        if ($deviceName) unset($validated['device_name']);

        if (Auth::attempt($validated)) {
            $user = User::query()->findOrFail(Auth::user()->id);
            $userProfile = UserProfile::query()->findOrFail($user->id);

            $deviceName = $deviceName ?? 'Token for user ID ' . $user->id;

            $token = $user->createToken($deviceName)->plainTextToken;

            return response()->json([
                'message' => 'User logged in successfully.',
                'token' => $token,
                'user' => $user,
                'user_profile' => $userProfile
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid email or password.',
        ], 401);
    }
}
