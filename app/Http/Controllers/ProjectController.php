<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project->toArray()
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }
}
