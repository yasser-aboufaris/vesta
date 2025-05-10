<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    use HasFactory;
    protected $fillable = ['program_id','day_number'];
    public function program(): BelongsTo { return $this->belongsTo(Program::class); }

    public function meals() {
        // dd(1);
        return $this->belongsToMany(Meal::class, 'day_meal')
                    ->withPivot('grams')
                    ->withTimestamps();
    }

    public function exercises(){
        return $this->belongsToMany(Exercise::class, 'day_exercise')
                    ->withPivot('repetitions')
                    ->withTimestamps();
    }
}