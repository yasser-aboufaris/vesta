<?php
namespace App\Repositories;

use App\Models\Client;
use App\Models\User;
use App\Repositories\Interfaces\ClientRepositoryInterface;

class ClientRepository extends UserRepository implements ClientRepositoryInterface {

    public function signUp(array $data) {
        $data['role'] = 'client'; // or set a role_id if you're using a foreign key
        $data['password'] = $this->hashPassword($data['password']);
        return User::create($data);
    }

    public function insertClientData(object $user, array $data) {
        return Client::create([
            'user_id' => $user->id,
            'age'     => $data['age'],
            'weight'  => $data['weight'],
            'height'  => $data['height'],
            'sex'     => $data['sex'],
            'race'    => $data['race'],
        ]);
    }

    public function getClientByUserId(int $userId) {
        return Client::where('user_id', $userId)->get();
    }
}
