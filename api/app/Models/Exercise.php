<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;
    protected $fillable = ['name','description'];
    public function days(): BelongsToMany {
        return $this->belongsToMany(Day::class, 'day_exercise')
                    ->withPivot('repetitions')
                    ->withTimestamps();
    }
}
