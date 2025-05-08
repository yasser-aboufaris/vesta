<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Day extends Model
{
    protected $fillable = ['program_id', 'day_number'];

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function meals(): HasMany
    {
        return $this->hasMany(DayMeal::class, 'program_day_id');
    }

    public function exercises(): HasMany
    {
        return $this->hasMany(DayExercise::class, 'program_day_id');
    }
}