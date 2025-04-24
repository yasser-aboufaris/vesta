<?php
namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

abstract class UserRepository implements UserRepositoryInterface {

    abstract public function signUp(array $data);

    public function login(array $credentials) {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !$this->checkPassword($credentials['password'], $user->password)) {
            return null;
        }

        return "You are logged in successfully.";
    }

    protected function hashPassword(string $password): string {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    protected function checkPassword(string $raw, string $hashed): bool {
        return password_verify($raw, $hashed);
    }
}
