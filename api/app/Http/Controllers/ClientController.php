<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\ClientRepositoryInterface;

class ClientController extends Controller
{
    private $clientReposistory;
    public function __Construct(ClientRepositoryInterface $clientReposistory){
         $this->clientRepository = $clientReposistory;
    }
    public function signUp(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'age' => 'required|integer|min:0',
            'weight' => 'required|numeric|min:0',
            'height' => 'required|numeric|min:0',
            'race' => 'required|string',
        ]);
    
        if ($request->hasFile('profile_picture')) {
            $validatedData['profile_picture'] = $request->file('profile_picture');
        }
    
        $client = $this->clientRepository->signUp($validatedData);
        $token = $client->createToken('auth_token')->plainTextToken;

    
        return response()->json([
            'client' => $client,
            'token' => $token
        ], 201);
    }
    
    public function test(){
        $return = $this->clientRepository->test(); 
        return response()->json([
            'message' => $return
        ]);            
    }
    
}
