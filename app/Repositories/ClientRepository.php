<?php
namespace App\Repositories;

use App\Models\Client;
use App\Repositories\Interfaces\ClientRepositoryInterface;

class ClientRepository implements ClientRepositoryInterface {
    public function createClient(object $user, array $data) {
        return Client::create([
            'user_id' => $user->id,  // ✅ Use object property access
            'age'     => $data['age'],
            'weight'  => $data['weight'],
            'height'  => $data['height'],
            'sex'     => $data['sex'],
            'race'    => $data['race'],
        ]);
    }
    
}
