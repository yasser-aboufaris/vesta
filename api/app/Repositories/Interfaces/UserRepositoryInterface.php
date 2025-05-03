<?php
namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserRepositoryInterface {
    public function signUp(array $data);
    public static function login(array $credentials) ;
}