<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;
class ExerciseController extends Controller
{
    public function index()
    {
        $exercises = Exercise::all();
        return response()->json($exercises);
    }



    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $exercise = Exercise::create($request->all());
        return response()->json($exercise, 201);
    }


    public function destroy($id)
    {
        $exercise = Exercise::find($id);
        if (!$exercise) {
            return response()->json(['message' => 'Exercise not found'], 404);
        }

        $exercise->delete();
        return response()->json(['message' => 'Exercise deleted successfully']);
    }
    
}
