<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\PostReposotoryInterface;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;

class PostRepository implements PostRepositoryInterface
{
    public function all()
    {
        return Post::all();
    }
    
    public function find($id)
    {
        $post = Post::find($id);
        
        if (!$post) {
            throw new \Exception("Post not found");
        }
        
        return $post;
    }

    public function findByOwner($ownerId)
    {
        return Post::where('owner_id', $ownerId)->get();
    }

    public function create(array $data)
    {
        return Post::create($data);
    }

    public function update($id, array $data)
    {
        $post = $this->find($id);
        $post->update($data);
        
        return $post->fresh();
    }


    public function delete($id)
    {
        $post = $this->find($id);
        
        return $post->delete();
    }
}
