<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MealSeeder extends Seeder
{
    public function run(): void
    {
        $meals = [
            ['name' => 'Grilled Chicken Breast', 'calories_per_100g' => 165],
            ['name' => 'Steamed Broccoli', 'calories_per_100g' => 35],
            ['name' => 'Brown Rice', 'calories_per_100g' => 112],
            ['name' => 'Boiled Eggs', 'calories_per_100g' => 155],
            ['name' => 'Avocado', 'calories_per_100g' => 160],
            ['name' => 'Oatmeal', 'calories_per_100g' => 68],
            ['name' => 'Banana', 'calories_per_100g' => 89],
            ['name' => 'Apple', 'calories_per_100g' => 52],
            ['name' => 'Tuna (canned in water)', 'calories_per_100g' => 116],
            ['name' => 'Salmon', 'calories_per_100g' => 208],
            ['name' => 'Almonds', 'calories_per_100g' => 579],
            ['name' => 'Greek Yogurt (plain)', 'calories_per_100g' => 59],
            ['name' => 'Whole Wheat Bread', 'calories_per_100g' => 247],
            ['name' => 'Sweet Potato', 'calories_per_100g' => 86],
            ['name' => 'Lentils', 'calories_per_100g' => 116],
            ['name' => 'Cottage Cheese', 'calories_per_100g' => 98],
            ['name' => 'Peanut Butter', 'calories_per_100g' => 588],
            ['name' => 'Chickpeas', 'calories_per_100g' => 164],
            ['name' => 'Green Beans', 'calories_per_100g' => 31],
            ['name' => 'Zucchini', 'calories_per_100g' => 17],
            ['name' => 'Pasta (cooked)', 'calories_per_100g' => 131],
            ['name' => 'Beef Steak (grilled)', 'calories_per_100g' => 271],
            ['name' => 'Quinoa', 'calories_per_100g' => 120],
            ['name' => 'Protein Shake', 'calories_per_100g' => 100],
            ['name' => 'Carrots', 'calories_per_100g' => 41],
        ];

        DB::table('meals')->insert($meals);
    }
}
