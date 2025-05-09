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
    }
}
