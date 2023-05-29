<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Project;
use App\Models\ProjectDesign;
use Tests\TestCase;

class ProjectTest extends TestCase
{

    public function test_project_relationships(): void
    {
        $customer = Customer::factory()->create();
        $project = Project::factory()
            ->for($customer)
            ->create();

        $this->assertNotNull($project->customer);
        $this->assertEquals($customer->id, $project->customer->id);

        $design = ProjectDesign::factory()->make();

        $project->designs()->save($design);

        $this->assertNotNull($project->designs()->get()->first());


        $this->assertEquals($project->id, $project->designs()->get()->first()->project->id);
    }
}
