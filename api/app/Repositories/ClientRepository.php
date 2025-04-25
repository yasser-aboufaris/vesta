<?php
namespace App\Repositories;

use App\Models\Client;
use App\Models\User;
use App\Repositories\Interfaces\ClientRepositoryInterface;

class ClientRepository extends UserRepository implements ClientRepositoryInterface {

    public function signUp(array $data)
    {
        $data['role_id'] = 3; 
        $data['password'] = $this->hashPassword($data['password']);
        
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role_id' => $data['role_id'],
        ]);
        
        Client::create([
            'id_user' => $user->id,
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'age' => $data['age'],
            'weight' => $data['weight'],
            'height' => $data['height'],
        ]);
        
        // Generate a Sanctum token for the user
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return $token;
    }

    public function getClientByUserId(int $userId) {
        return Client::where('user_id', $userId)->get();
    }
}
