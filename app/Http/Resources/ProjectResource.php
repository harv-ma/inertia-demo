<?php

namespace App\Http\Resources;

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
            'id' => $this->id,
            'name' => $this->name,
            'name_generated' => $this->name_generated,
            'reference' => $this->name,
            'customer' => [
                'name' => $this->customer->name
            ],
            'start_date' => $this->start_date->format('d/m/Y'),
            'delivery_date' => $this->start_date->format('d/m/Y'),
        ];
    }
}
