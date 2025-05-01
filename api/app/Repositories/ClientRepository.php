<?php
namespace App\Repositories;

use App\Models\Client;
use App\Models\User;
use App\Repositories\Interfaces\ClientRepositoryInterface;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class ClientRepository extends UserRepository implements ClientRepositoryInterface
{

    public function signUp(array $data): string
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role_id' => 3,
        ]);
    
        $user->client()->create([
            'age' => $data['age'],
            'weight' => $data['weight'],
            'height' => $data['height'],
            'race' => $data['race'],
        ]);
    
        return $user;
    }
    
    public function test(){
        return "it worked";
    }
    

    public function insertClientData(User $user, array $data): Client
    {
        $requiredFields = ['age', 'weight', 'height'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                throw new InvalidArgumentException("Missing required field: $field");
            }
        }

        return Client::create([
            'id_user' => $user->id,
            'age' => $data['age'],
            'weight' => $data['weight'],
            'height' => $data['height'],
        ]);
    }

    public function getClientByUserId(int $userId): ?Client
    {
        return Client::where('id_user', $userId)->first();
    }
    public function updateClientData(int $userId, array $data): bool
    {
        $client = Client::where('id_user', $userId)->first();
        if (!$client) {
            return false;
        }
    
        if (isset($data['profile_picture']) && $data['profile_picture'] instanceof \Illuminate\Http\UploadedFile) {
            $path = $data['profile_picture']->store('profiles', 'public');
            $data['profile_picture'] = $path;
        }
    
        return $client->update($data);
    }
    

}