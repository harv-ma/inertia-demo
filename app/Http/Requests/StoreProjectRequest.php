<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'name_generated' => 'required|string|max:255',
            'customer_id' => 'required|numeric|exists:customers,id',
            'reference' => 'required|string|max:255',
            'workstream' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'delivery_date' => 'nullable|date',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'postcode' => 'required|string|max:7',
        ];
    }
}
