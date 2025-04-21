<?php
namespace App\Repositories\Interfaces;

interface ClientRepositoryInterface {
    public function createClient(object $user, array $data);
}