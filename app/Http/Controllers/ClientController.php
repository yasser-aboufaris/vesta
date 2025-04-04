<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Repositories\ClientRepository;
use Illuminate\Http\Request;

class ClientController extends Controller {
    protected $userRepository;
    protected $clientRepository;

    public function __construct() {
        $this->userRepository = new UserRepository();
        $this->clientRepository = new ClientRepository();
    }

    public function register(Request $request) {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'email'   => 'required|email',
            'password'=> 'required|min:6',
            'age'     => 'required|integer',
            'weight'  => 'required|integer',
            'height'  => 'required|integer',
            'sex'     => 'required|string',
            'race'    => 'required|string',
        ]);

        $user = $this->userRepository->signUp([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role_id' => 3,
        ]);

        $client = $this->clientRepository->createClient($user, $validated);

        return response()->json([
            'user' => $user,
            'client' => $client,
        ]);
    }
}
