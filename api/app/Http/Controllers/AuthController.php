<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
    
        if ($user->role_id === 2) {
            $trainer = $this->trainerRepository->getByUserId($user->id);
            return response()->json([
                'user' => $user,
                'trainer' => $trainer,
                'token' => $token
            ]);
        } elseif ($user->role_id === 3) {
            $client = $this->clientRepository->getByUserId($user->id);
            return response()->json([
                'user' => $user,
                'client' => $client,
                'token' => $token
            ]);
        }
    
        return response()->json(['user' => $user, 'token' => $token]);
    }
    

    
}
