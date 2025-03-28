<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Speciality extends Model
{
    protected $fillable = ['name', 'description'];

    public function Test()
    {
        return $this->belongsToOne(Test::class);
    }

    public function Question()
    {
        return $this->hasMany(Question::class);
    }

}