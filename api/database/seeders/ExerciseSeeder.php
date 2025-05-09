<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        $exercises = [
            ['name' => 'Push Ups', 'description' => 'An upper-body strength exercise targeting chest, shoulders, and triceps.'],
            ['name' => 'Squats', 'description' => 'A lower-body movement focusing on quads, hamstrings, and glutes.'],
            ['name' => 'Plank', 'description' => 'Core-strengthening exercise that works abdominal and back muscles.'],
            ['name' => 'Lunges', 'description' => 'Works legs and glutes; improves balance and stability.'],
            ['name' => 'Deadlifts', 'description' => 'Full-body exercise that focuses on back, glutes, and legs.'],
            ['name' => 'Bicep Curls', 'description' => 'Isolates and builds the biceps.'],
            ['name' => 'Tricep Dips', 'description' => 'Targets triceps using bodyweight.'],
            ['name' => 'Pull-Ups', 'description' => 'Upper-body exercise for back and biceps.'],
            ['name' => 'Bench Press', 'description' => 'Chest and upper-body pressing movement.'],
            ['name' => 'Shoulder Press', 'description' => 'Strengthens shoulders and upper traps.'],
            ['name' => 'Mountain Climbers', 'description' => 'Full-body cardio and core movement.'],
            ['name' => 'Jumping Jacks', 'description' => 'Cardio exercise for warming up the whole body.'],
            ['name' => 'Burpees', 'description' => 'Full-body explosive cardio movement.'],
            ['name' => 'Russian Twists', 'description' => 'Core exercise focused on obliques.'],
            ['name' => 'Leg Raises', 'description' => 'Abdominal exercise targeting lower abs.'],
            ['name' => 'Sit-Ups', 'description' => 'Classic core movement.'],
            ['name' => 'Calf Raises', 'description' => 'Strengthens calves.'],
            ['name' => 'Hip Thrusts', 'description' => 'Glute-building movement.'],
            ['name' => 'Jump Rope', 'description' => 'Cardio exercise improving coordination and endurance.'],
            ['name' => 'High Knees', 'description' => 'Intense cardio movement.'],
        ];

        DB::table('exercises')->insert($exercises);
    }
}
