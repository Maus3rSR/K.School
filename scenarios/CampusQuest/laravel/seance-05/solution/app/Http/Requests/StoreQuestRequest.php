<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreQuestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // l'autorisation arrive en S6
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'xp' => ['required', 'integer', 'min:0', 'max:500'],
            'difficulty' => ['required', Rule::in(['easy', 'medium', 'hard'])],
            'category_id' => ['required', 'exists:categories,id'],
            'featured' => ['boolean'],
            'location_ids' => ['array'],
            'location_ids.*' => ['exists:locations,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Le titre est obligatoire.',
            'title.max' => 'Le titre ne peut pas dépasser 100 caractères.',
        ];
    }
}
