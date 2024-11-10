<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $user = $request->user();
        $userProfile = UserProfile::query()->findOrFail($user->id);

        return response()->json([
            'user' => $user,
            'user_profile' => $userProfile
        ]);
    }
}
