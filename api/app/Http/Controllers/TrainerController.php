<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Interfaces\TrainerRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TrainerController extends Controller
{
    protected TrainerRepositoryInterface $trainerRepository;

    public function __construct(TrainerRepositoryInterface $trainerRepository)
    {
        $this->trainerRepository = $trainerRepository;
    }

    public function signUp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|string|min:6',
            'speciality_id' => 'required|exists:specialities,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $this->trainerRepository->signUp($request->all());

        return response()->json(['message' => 'Trainer registered successfully.', 'user' => $user], 201);
    }


    public function update(Request $request, int $userId)
    {
        $validator = Validator::make($request->all(), [
            'speciality_id' => 'required|exists:specialities,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updated = $this->trainerRepository->updateTrainerData($userId, $request->all());

        if (!$updated) {
            return response()->json(['message' => 'Trainer not found.'], 404);
        }

        return response()->json(['message' => 'Trainer updated successfully.']);
    }


    public function show(int $userId)
    {
        $trainer = $this->trainerRepository->getTrainerByUserId($userId);

        if (!$trainer) {
            return response()->json(['message' => 'Trainer not found.'], 404);
        }

        return response()->json($trainer);
    }
}
