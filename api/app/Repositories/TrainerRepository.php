<?php

namespace App\Repositories;

use App\Models\Trainer;
use App\Models\User;
use App\Repositories\Interfaces\TrainerRepositoryInterface;
use InvalidArgumentException;

class TrainerRepository extends UserRepository implements TrainerRepositoryInterface
{
    public function signUp(array $data): User
    {
        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
            'role_id'  => 2, // assuming 2 = trainer
        ]);

        $user->trainer()->create([
            'speciality_id' => $data['speciality_id'],
        ]);

        return $user;
    }

    public function getTrainerByUserId(int $userId): ?Trainer
    {
        return Trainer::where('user_id', $userId)->first();
    }

    public function updateTrainerData(int $userId, array $data): bool
    {
        $trainer = Trainer::where('user_id', $userId)->first();
        if (!$trainer) {
            return false;
        }

        if (!isset($data['speciality_id'])) {
            throw new InvalidArgumentException("speciality_id is required for update");
        }

        return $trainer->update([
            'speciality_id' => $data['speciality_id'],
        ]);
    }

    public function test(): string
    {
        return "trainer repo works";
    }
}
