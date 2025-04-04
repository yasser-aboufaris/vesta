<?php
namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface {
    public function signUp(array $data) {
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        return User::create($data);
    }
}
