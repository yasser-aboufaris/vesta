<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exercise extends Model
{
    protected $table = 'exrcices';
    protected $fillable = ['name', 'description'];

    public function dayExercises(): HasMany
    {
        return $this->hasMany(DayExercise::class);
    }
}