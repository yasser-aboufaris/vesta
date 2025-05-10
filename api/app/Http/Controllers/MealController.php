<?php

namespace App\Http\Controllers;

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
    
}
