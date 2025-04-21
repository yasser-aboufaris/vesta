<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    public function Speciality(){
        return $this->belongsToOne(Speciality::class);
    }
    public function Question(){
        return $this->hasMany(Question::class);
    }
}
