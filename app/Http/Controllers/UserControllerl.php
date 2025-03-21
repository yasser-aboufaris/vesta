<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request){
        $validated = $request->validate(
            [
                'name' => 'required|string|max:200' ,
                'email' => 'required|email|unique:users',
                'role_id' => 'required|numeric',
                'password'=>'required|confirmed'
            ]
        );
        $user = User::create($validated);
        $token = $user->createToken($request->password);
        return [
            "user" => $user,
            "token" => $token->plainTextToken,
        ];
        }

        public function login(Request $request){
        $request->validate([
            'email' => 'required | email |exists:users',
            'password' => 'required '
        ]);

        $user = User::where('email' , $request->email)->first();
        // return $user;
        // dd($user);
        if(!$user || !Hash::check($request->password , $user->password)){
            return "invalide user";
        }
        $token = $user->createToken($request->email);
        return ['user' => $user ,
                'token' => $token->plainTextToken];
    }
    
    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return "out";
    }
        
}
