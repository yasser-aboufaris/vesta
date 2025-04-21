<?php
namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface {
    public function signUp(array $data) {
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        return User::create($data);
    }

    public function login(array $credentials) {
        $user = User::where('email', $credentials['email'])->first();
        if (!$user || !password_verify($credentials['password'], $user->password)) {
            return null;
        }
        return $user;
    }
}
