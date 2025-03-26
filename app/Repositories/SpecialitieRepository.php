<?php

namespace App\Repositories;

use App\Interfaces\SpecialitieRepositoryInterface;
use App\Models\Speciality;

class SpecialitieRepository implements SpecialitieRepositoryInterface
{
    public function all()
    {
        return Speciality::all();
    }

    public function find($id)
    {
        return Speciality::findOrFail($id);
    }

    public function create(array $data)
    {
        return Speciality::create($data);
    }

    public function delete($id)
    {
        return Speciality::destroy($id);
    }
}
