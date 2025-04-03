<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    public function user(){
        return $this->morphOne(User::class, 'role');
    }
}
