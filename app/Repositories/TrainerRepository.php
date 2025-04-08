<?php
namespace App\repositories; 
use App\Models\Trainer;

class TrainerRepository implements TrainerRepositoryInterface
{
    public function getTrainerData($data, $id)
    {
        $trainer = Trainer::findOrFail($id);
        return $trainer;
    }

    public function insertTrainerData($data)
    {
        return Trainer::create($data);
    }
}
