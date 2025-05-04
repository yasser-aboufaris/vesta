<?php
namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use InvalidArgumentException;

abstract class UserRepository implements UserRepositoryInterface
{
    abstract public function signUp(array $data);

    public static function login(array $credentials)
    {
        if (!isset($credentials['email']) || !isset($credentials['password'])) {
            throw new InvalidArgumentException('Email and password are required.');
        }

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !static::checkPassword($credentials['password'], $user->password)) {
            return null;
        }

        return $user;
    }

    protected static function hashPassword(string $password): User
    {
        return Hash::make($password);
    }

    protected static function checkPassword(string $raw, string $hashed): bool
    {
        return Hash::check($raw, $hashed);
    }
}