<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Meal extends Model
{
    protected $fillable = ['name', 'calories_per_100g'];

    public function dayMeals(): HasMany
    {
        return $this->hasMany(DayMeal::class);
    }
}