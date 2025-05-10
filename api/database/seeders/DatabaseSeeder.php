<?php 
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Roles
        DB::table('roles')->insert([
            ['name' => 'admin'],
            ['name' => 'trainer'],
            ['name' => 'client'],
        ]);

        // Tags
        DB::table('tags')->insert([
            ['name' => 'Fitness'],
            ['name' => 'Nutrition'],
            ['name' => 'Wellness'],
            ['name' => 'Strength'],
            ['name' => 'Cardio'],
            ['name' => 'Weight Loss'],
            ['name' => 'Muscle Gain'],
            ['name' => 'Yoga'],
            ['name' => 'Flexibility'],
            ['name' => 'Endurance'],
            ['name' => 'Home Workout'],
            ['name' => 'HIIT'],
            ['name' => 'Stretching'],
            ['name' => 'Motivation'],
        ]);

        // Meals
        DB::table('meals')->insert([
            ['name' => 'Chicken Breast', 'calories_per_100g' => 165],
            ['name' => 'Brown Rice', 'calories_per_100g' => 112],
            ['name' => 'Broccoli', 'calories_per_100g' => 34],
            ['name' => 'Salmon', 'calories_per_100g' => 208],
            ['name' => 'Quinoa', 'calories_per_100g' => 120],
            ['name' => 'Sweet Potato', 'calories_per_100g' => 86],
            ['name' => 'Greek Yogurt', 'calories_per_100g' => 59],
            ['name' => 'Almonds', 'calories_per_100g' => 579],
            ['name' => 'Oats', 'calories_per_100g' => 389],
            ['name' => 'Avocado', 'calories_per_100g' => 160],
            ['name' => 'Eggs', 'calories_per_100g' => 155],
            ['name' => 'Beef (lean)', 'calories_per_100g' => 250],
            ['name' => 'Tofu', 'calories_per_100g' => 76],
            ['name' => 'Lentils', 'calories_per_100g' => 116],
            ['name' => 'Banana', 'calories_per_100g' => 89],
            ['name' => 'Apple', 'calories_per_100g' => 52],
            ['name' => 'Peanut Butter', 'calories_per_100g' => 588],
            ['name' => 'Cottage Cheese', 'calories_per_100g' => 98],
            ['name' => 'Tuna', 'calories_per_100g' => 132],
            ['name' => 'Zucchini', 'calories_per_100g' => 17],
        ]);
        DB::table('exercises')->insert([
            ['name' => 'Push Ups', 'description' => 'An upper-body exercise targeting chest, shoulders, and triceps.'],
            ['name' => 'Squats', 'description' => 'A lower-body movement focusing on quads, hamstrings, and glutes.'],
            ['name' => 'Plank', 'description' => 'Core-strengthening exercise that works abdominal and back muscles.'],
            ['name' => 'Burpees', 'description' => 'A full-body exercise that increases endurance and burns fat.'],
            ['name' => 'Jumping Jacks', 'description' => 'A cardio move that also improves overall body coordination.'],
            ['name' => 'Mountain Climbers', 'description' => 'An intense cardio and core workout performed on the floor.'],
            ['name' => 'Lunges', 'description' => 'Leg exercise improving balance and hitting multiple muscle groups.'],
            ['name' => 'Deadlifts', 'description' => 'A strength movement focusing on back, hamstrings, and glutes.'],
            ['name' => 'Bench Press', 'description' => 'Chest-focused strength exercise using a barbell or dumbbells.'],
            ['name' => 'Pull Ups', 'description' => 'Back and biceps compound movement performed on a bar.'],
            ['name' => 'Bicep Curls', 'description' => 'Isolation exercise to build and tone the biceps.'],
            ['name' => 'Tricep Dips', 'description' => 'Bodyweight exercise targeting the triceps and chest.'],
            ['name' => 'Shoulder Press', 'description' => 'Overhead press movement that works deltoids and triceps.'],
            ['name' => 'Russian Twists', 'description' => 'Core movement that targets the obliques with rotation.'],
            ['name' => 'Leg Raises', 'description' => 'Abdominal exercise performed while lying down to engage the core.'],
        ]);
        
    }
}
