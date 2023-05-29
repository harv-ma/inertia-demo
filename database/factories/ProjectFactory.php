<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Project;
use Closure;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    public function configure(): static
    {
        return $this->afterMaking(function (Project $project) {
            if (!$project->customer_id) {
                $customer = Customer::factory()->create();
                $project->customer_id = $customer->id;
                $project->name_generated =  $project->reference . '-' . substr($project->name, 0, 4) . '-' . $customer->abbreviation;
            } elseif (!$project->name_generated) {
                $project->name_generated =  $project->reference . '-' . substr($project->name, 0, 4) . '-' . $project->customer->abbreviation;
            }
        });
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->company();
        $ref = $this->faker->asciify();

        return [
            'name' => $this->faker->company(),
            'reference' => $ref,
            'start_date' => $this->faker->date(),
            'address_line_1' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'postcode' => $this->faker->postcode(),
        ];
    }
}
