<?php

namespace App\Repositories\Interfaces;

use App\Models\Trainer;
use App\Models\User;

interface TrainerRepositoryInterface
{
    public function signUp(array $data): User;

    public function getTrainerByUserId(int $userId): ?Trainer;

    public function updateTrainerData(int $userId, array $data): bool;

    public function test(): string;
}
