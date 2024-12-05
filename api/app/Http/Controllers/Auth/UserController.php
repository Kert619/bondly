<?php

namespace App\Http\Controllers\Auth;

use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

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
