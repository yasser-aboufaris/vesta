<?php

namespace App\Repositories;

use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use App\Models\Post;

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
        $post = Post::destroy($id);
        dd($post);
        // return $post;
// $post = Post::destroy($id);
        // return $post;
        // dd($id);
    }
}
