<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectDesign extends Model
{
    use HasFactory;

    public $fillable = [
        'status',
        'comment'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
