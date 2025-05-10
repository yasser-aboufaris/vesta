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
        $programs = Program::with([
            'days.meals' => function ($query) {
                $query->select('meals.id', 'name', 'calories_per_100g');
            },
            'days.exercises' => function ($query) {
                $query->select('exercises.id', 'name', 'description');
            }
        ])->get();
    
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
            
            'days' => 'required|array|min:7|max:7', 
            
            'days.*.day_number' => 'required|integer|min:1|max:7',
        
            'days.*.meals' => 'required|array|min:1',
            'days.*.meals.*.meal_id' => 'required|exists:meals,id',
            'days.*.meals.*.grams' => 'required|integer|min:1',
        
            'days.*.exercises' => 'required|array|min:1',
            'days.*.exercises.*.exercise_id' => 'required|exists:exercises,id',
            'days.*.exercises.*.repetitions' => 'required|integer|min:1',
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

                foreach ($dayData['meals'] as $meal) {
                    $day->meals()->attach($meal['meal_id'], ['grams' => $meal['grams']]);
                }
            }

            if (isset($dayData['exercises'])) {
                foreach ($dayData['exercises'] as $exercise) {
                    $day->exercises()->attach($exercise['exercise_id'], [
                        'repetitions' => $exercise['repetitions']
                    ]);
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