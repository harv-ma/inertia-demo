<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\StoreProjectRequest;
use App\Models\Project;

class ProjectAPIController extends \App\Http\Controllers\Controller
{
    public function update(StoreProjectRequest $request, Project $project)
    {
        $project->update($request->input());

        return to_route('projects.index');
    }
}
