<?php
namespace App\Repositories\Interfaces;

interface ClientRepositoryInterface {
    public function insertClientData(object $user, array $data);
    public function getClientByUserId(int $userId);
}
