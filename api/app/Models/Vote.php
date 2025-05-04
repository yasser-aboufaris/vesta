<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'post_id',
        'vote_type',
    ];

    public function Post()
    {
        return $this->belongsTo(Post::class);
    }
    
    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
