<?php

namespace App\Http\Requests\Auth;

use App\Enums\Gender;
use App\Enums\Mood;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'gender' => ['nullable', Rule::enum(Gender::class)],
            'mood' => ['required', Rule::enum(Mood::class)],
            'profile_photo' => ['nullable', 'string', 'max:2096'],
            'cover_photo' => ['nullable', 'string', 'max:2096']
        ];
    }
}
