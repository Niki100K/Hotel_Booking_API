<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => fake()->unique()->numerify('Room ###'),
            'type' => fake()->randomElement(['Standard', 'Deluxe', 'Suite']),
            'price_per_night' => fake()->randomFloat(2, 50, 500),
            'status' => fake()->randomElement(['available', 'unavailable']),
        ];
    }
}
