<?php
namespace App\Repositories\Interfaces;

use App\Models\Client;
use App\Models\User;

interface ClientRepositoryInterface extends UserRepositoryInterface {
    public function insertClientData(User $user, array $data);
    public function getClientByUserId(int $userId);
}