<?php

namespace App\Repositories;

use App\Models\Post;
use App\Repositories\Interfaces\PostReposotoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PostRepository implements PostReposotoryInterface
{
    public function all()
    {
        return Post::with('tags')->get();
    }

   
}
