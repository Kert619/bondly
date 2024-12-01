<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateUserProfileRequest;
use App\Models\UserProfile;

class UpdateUserProfileController extends Controller
{
    public function __invoke(UpdateUserProfileRequest $request)
    {
        $validated = $request->validated();

        $userProfile = UserProfile::query()->findOrFail($request->user()->id);

        $userProfile->update(array_merge($validated, ['profile_completed' => true]));

        return $userProfile;
    }
}
