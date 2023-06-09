<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectDesignResource;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\ProjectDesign;
use Illuminate\Http\Request;

class ProjectAPIController extends \App\Http\Controllers\Controller
{
    public function store(StoreProjectRequest $request)
    {
        $project = Project::create($request->input());

        return to_route('projects.show', $project->id);
    }

    public function update(StoreProjectRequest $request, Project $project)
    {
        $project->update($request->input());

        return to_route('projects.show', $project->id);
    }

    public function query(Request $request)
    {
        $query = Project::query()->limit(5);

        if ($sort = $request->get('sort_by')) {
            $query = $query->orderBy($sort, $request->get('direction', 'asc'));
        } else {
            $query = $query->orderBy('created_at', 'desc');
        }

        return ProjectResource::collection($query->paginate($request->get('per_page', 10)));
    }

    public function queryDesigns(Request $request, Project $project)
    {
        $query = ProjectDesign::query()->where('project_id', $project->id);

        if ($sort = $request->get('sort_by')) {
            $query = $query->orderBy($sort, $request->get('direction', 'asc'));
        } else {
            $query = $query->orderBy('created_at', 'desc');
        }

        return ProjectDesignResource::collection($query->paginate($request->get('per_page', 10)));
    }
}
