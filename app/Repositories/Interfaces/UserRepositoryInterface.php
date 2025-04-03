<?php 
namespace App\Repositories\Interfaces;

interface UserRepositoryInterface
{
    public function register(array $data);
    public function login(array $data);
    public function logout();
    public function getUserById($id);
    public function deleteUser($id);
}