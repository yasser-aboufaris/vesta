<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\TrainerRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;

class TrainerController extends Controller
{
    protected $trainerRepository;
    protected $userRepository;

    public function __construct( TrainerRepositoryInterface $trainerRepository , UserRepositoryInterface $userRepository)
    {  
        
    }

    public function registerTrainer(Request $request) {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email',
            'password'     => 'required|min:6',
            'id_speciality'=> 'required|integer|exists:specialities,id',
        ]);
    
        $user = $this->userRepository->signUp([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role_id' => 2, 
        ]);
    
        $trainer = $this->trainerRepository->createTrainer($user, $validated);
    
        return response()->json([
            'user' => $user,
            'trainer' => $trainer,
        ]);
    }
    



}
