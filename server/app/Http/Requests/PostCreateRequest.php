<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PostCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required',
            'description' => 'required',
            'featuredImage' => 'required',
            'publishDate' => 'required|date|after:' . now(),
            'published' => 'required'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = [
            'status' => 422,
            'statusText' => "Error validation",
            'errors' => $validator->errors(),
        ];

        return throw new HttpResponseException(response()->json($response, 422));
    }
}
