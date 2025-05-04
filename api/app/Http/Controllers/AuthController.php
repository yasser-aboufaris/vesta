<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Repositories\UserRepository;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // dd($request->all());

        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        // return response()->json([
        //     'message' => $validatedData,
        // ], 200);

        $user = UserRepository::login($validatedData);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }
    public function dd(Request $request){
        dd($request);
    }
}
