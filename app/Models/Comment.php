<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    $fillables = [];
    public function post(){
        return $this->belongsTo(Post::class);
    }
}
