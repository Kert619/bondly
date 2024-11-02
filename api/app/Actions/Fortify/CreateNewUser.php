<?php

namespace App\Actions\Fortify;

use App\Enums\GenderEnum;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'birth_date' => 'required|date',
            'gender' => ['required',Rule::enum(GenderEnum::class)]
        ])->validate();

        $user = User::create([
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name'],
            'birth_date' => $input['birth_date'],
            'gender' => $input['gender']
        ]);

        return $user;
    }
}
