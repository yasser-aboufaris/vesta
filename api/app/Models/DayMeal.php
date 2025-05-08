<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DayMeal extends Model
{
    protected $fillable = ['program_day_id', 'meal_id', 'grams'];

    public function day(): BelongsTo
    {
        return $this->belongsTo(Day::class, 'program_day_id');
    }

    public function meal(): BelongsTo
    {
        return $this->belongsTo(Meal::class);
    }
}