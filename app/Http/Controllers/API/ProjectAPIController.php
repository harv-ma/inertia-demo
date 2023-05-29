<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectAPIController extends \App\Http\Controllers\Controller
{
    public function update(StoreProjectRequest $request, Project $project)
    {
        $project->update($request->input());

        return to_route('projects.index');
    }

    public function query(Request $request)
    {
        $query = Project::query()->limit(5);

        return ProjectResource::collection($query->paginate($request->query('per_page', 10)));
    }
}
