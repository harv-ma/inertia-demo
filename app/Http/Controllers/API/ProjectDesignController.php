<?php

namespace App\Http\Controllers\API;

use App\Models\ProjectDesign;
use Illuminate\Http\Request;

class ProjectDesignController extends \App\Http\Controllers\Controller
{
    public function update(Request $request, ProjectDesign $design)
    {
        $design->update($request->input());

        return back();
    }
}
