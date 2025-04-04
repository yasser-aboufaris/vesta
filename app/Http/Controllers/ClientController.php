<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

    class ClientController extends Controller {
        protected UserRepositoryInterface $userRepository;
        protected ClientRepositoryInterface $clientRepository;
    
        public function __construct(
            UserRepositoryInterface $userRepository,
            ClientRepositoryInterface $clientRepository
        ) {
            $this->userRepository = $userRepository;
            $this->clientRepository = $clientRepository;
        }
    
        public function signUp(Request $request) {
            $validated = $request->validate([
                'email'   => 'required|email',
                'password'=> 'required|min:6',
                'age'     => 'required|integer',
                'weight'  => 'required|integer',
                'height'  => 'required|integer',
                'sex'     => 'required|string',
                'race'    => 'required|string',
            ]);
    
            $user = $this->userRepository->signUp([
                'email' => $validated['email'],
                'password' => $validated['password'],
            ]);
    
            $client = $this->clientRepository->createClient($user, $validated);
    
            return response()->json([
                'user' => $user,
                'client' => $client,
            ]);
        }
    }

