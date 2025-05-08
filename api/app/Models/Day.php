<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    use HasFactory;
    protected $fillable = [
        'day',
        'program_id',
    ];
    public function Program(){
        return $this->belongsTo(Program::class);
    }
    public function Exercise(){
        return $this->hasMany(Exercise::class);
    }
    public function meals(){
        return $this->hasMany(Meal::class);
    }

    
}
