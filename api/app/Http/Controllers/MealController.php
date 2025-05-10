<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Meal;

class MealController extends Controller
{
    public function index()
    {
        // Fetch all meals
        $meals = Meal::all();

        return response()->json($meals);
    }

    public function delete($id)
    {
        $meal = Meal::find($id);
        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        $meal->delete();

        return response()->json(['message' => 'Meal deleted successfully']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'calories_per_100g' => 'required|numeric|min:0',
        ]);
    
        $existingMeal = Meal::where('name', $request->name)->get();
    
        if ($existingMeal) {
            return response()->json(['message' => 'Meal already exists'], 409);
        }
    
        $meal = Meal::create($request->all());
    
        return response()->json($meal, 201);
    }


public function mealsStats()
{
    $bestCuttingMeal = Meal::orderBy('calories_per_100g', 'asc')->first();

    $bestBulkingMeal = Meal::orderBy('calories_per_100g', 'desc')->first();

    $mostUsedMeal = DB::table('day_meal')
        ->join('meals', 'day_meal.meal_id', '=', 'meals.id')
        ->select('meals.id', 'meals.name', 'meals.calories_per_100g', DB::raw('COUNT(*) as usage_count'))
        ->groupBy('meals.id', 'meals.name', 'meals.calories_per_100g')
        ->orderByDesc('usage_count')
        ->first();

    return response()->json([
        'best_cutting_meal' => $bestCuttingMeal ? [
            'id' => $bestCuttingMeal->id,
            'name' => $bestCuttingMeal->name,
            'calories_per_100g' => $bestCuttingMeal->calories_per_100g,
        ] : null,

        'best_bulking_meal' => $bestBulkingMeal ? [
            'id' => $bestBulkingMeal->id,
            'name' => $bestBulkingMeal->name,
            'calories_per_100g' => $bestBulkingMeal->calories_per_100g,
        ] : null,

        'most_used_meal' => $mostUsedMeal ? [
            'id' => $mostUsedMeal->id,
            'name' => $mostUsedMeal->name,
            'calories_per_100g' => $mostUsedMeal->calories_per_100g,
            'used_in_days' => $mostUsedMeal->usage_count,
        ] : null,
    ]);
}

    
}
