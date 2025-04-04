<?php
namespace App\Repositories\Interfaces;

interface ClientRepositoryInterface {
    public function createClient(array $user, array $data);
}