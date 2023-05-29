<?php

namespace App\Http\Resources;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),
            'customer' => [
                'name' => $this->customer->name
            ],
            'start_date' => $this->start_date->format('d/m/Y'),
            'delivery_date' => $this->start_date->format('d/m/Y'),
        ];
    }
}
