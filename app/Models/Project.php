<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    public $fillable = [
        'name',
        'name_generated',
        'customer_id',
        'reference',
        'workstream',
        'start_date',
        'delivery_date',
        'address_line_1',
        'address_line_2',
        'city',
        'postcode',
    ];

    public $casts = [
        'start_date' => 'date',
        'delivery_date' => 'date',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function designs(): HasMany
    {
        return $this->hasMany(ProjectDesign::class, 'project_id');
    }
}
