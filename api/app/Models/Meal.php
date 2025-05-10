<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;
    protected $fillable = ['name','calories_per_100g'];
    public function days(): BelongsToMany {
        return $this->belongsToMany(Day::class, 'day_meal')
                    ->withPivot('grams')
                    ->withTimestamps();
    }
}
