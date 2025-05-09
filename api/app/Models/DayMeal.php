<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DayMeal extends Model
{
    protected $fillable = ['day_id', 'meal_id', 'grams'];

    public function day()
    {
        return $this->belongsTo(Day::class, 'day_id');
    }
    
    public function meal()
    {
        return $this->belongsTo(Meal::class, 'meal_id');
    }
    
}