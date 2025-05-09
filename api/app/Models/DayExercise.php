<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DayExercise extends Model
{
    protected $fillable = ['program_day_id', 'exercise_id'];

    public function day(): BelongsTo
    {
        return $this->belongsTo(Day::class, 'program_day_id');
    }

    public function exercise(): BelongsTo
    {
        return $this->hasMany(Exercise::class);
    }
}