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

    public function find($id)
    {
        return Post::with('tags')->findOrFail($id);
    }

    public function create(array $data)
    {
        $post = Post::create($data);
        if (isset($data['tags'])) {
            $post->tags()->sync($data['tags']);
        }
        return $post;
    }

 
}
