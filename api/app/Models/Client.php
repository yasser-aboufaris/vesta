<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'user_id',
        'age',
        'weight',
        'height',
        "sex",
        "race",
        
    ];
    public function user(){
        return $this->morphOne(User::class, 'role');
    }
}
