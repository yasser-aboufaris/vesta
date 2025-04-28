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
    public function signUp(Request $request){
        // dd($request->all());
        // return response()->json([
        //     'message' => 'Client created successfully',
        //     'client' => $request->all()
        // ], 201);
        // dd($request);
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'age' => 'required|integer|min:0',
            'weight' => 'required|numeric|min:0',
            'height' => 'required|numeric|min:0',
            'race' => 'required|string',
        ]);
        // dd($validatedData);

        
        
        $client = $this->clientRepository->signUp($validatedData);
        return response()->json([
            'message' => 'Client created successfully',
            'client' => $client
        ], 201);
    }
    public function test(){
        $return = $this->clientRepository->test(); 
        return response()->json([
            'message' => $return
        ]);
            
    }
    
}
