<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\ProjectDesign;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($sort = $request->get('sort_by')) {
            $query = $query->orderBy($sort, $request->get('direction', 'asc'));
        } else {
            $query = $query->orderBy('created_at', 'desc');
        }

        return Inertia::render('Projects/Index', [
            'projects' => fn () => ProjectResource::collection($query->paginate($request->query('per_page', 10)))
        ]);
    }

    public function show(Request $request, Project $project)
    {
        $designs = ProjectDesign::query();

        if ($sort = $request->get('sort_by')) {
            $designs = $designs->orderBy($sort, $request->get('direction', 'asc'));
        }

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project->toArray(),
            'back' => url()->previous()
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }
}
