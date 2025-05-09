<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Day;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgramController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $programs = Program::where('user_id', $userId)->with('days')->get();
        return response()->json($programs);
    }
    public function test(){
        return response()->json([
            'products' => [
                ['id' => 1, 'name' => 'Product 1', 'price' => 100],
                ['id' => 2, 'name' => 'Product 2', 'price' => 200],
            ]
        ]); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'days' => 'required|array',
            'days.*.day_number' => 'required|integer|min:1',
            'days.*.meals' => 'array',
            'days.*.meals.*.meal_id' => 'required|exists:meals,id',
            'days.*.meals.*.grams' => 'required|integer|min:1',
            'days.*.exercises' => 'array',
            'days.*.exercises.*.exercise_id' => 'required|exists:exrcices,id',
        ]);

        $program = Program::create([
            'name' => $request->name,
            'user_id' => Auth::id(),
        ]);

        foreach ($request->days as $dayData) {
            $day = Day::create([
                'program_id' => $program->id,
                'day_number' => $dayData['day_number'],
            ]);

            if (isset($dayData['meals'])) {
                dd($dayData['meals']);
                foreach ($dayData['meals'] as $meal) {
                    $day->meals()->attach($meal['meal_id'], ['grams' => $meal['grams']]);
                }
            }
            dd($dayData['exercises']);

            if (isset($dayData['exercises'])) {
                foreach ($dayData['exercises'] as $exercise) {
                    $day->exercises()->attach($exercise['exercise_id']);
                }
            }
        }

        return response()->json($program->load('days.meals', 'days.exercises'), 201);
    }

    public function show($id)
    {
        $userId = Auth::id();
        $program = Program::where('user_id', $userId)->with(['days.meals', 'days.exercises'])->findOrFail($id);
        return response()->json($program);
    }

    public function destroy($id)
    {
        $userId = Auth::id();
        $program = Program::where('user_id', $userId)->findOrFail($id);
        $program->delete();
        return response()->json(['message' => 'Program deleted']);
    }
}