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
        $posts = Post::with('tags')->get();
        return $posts;
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
        $data['user_id'] = 3;
    
        $tags = $data['tags'] ?? []; 
        
        unset($data['tags']);
        
        $post = Post::create($data);
        
        if (!empty($tags)) {
            $post->tags()->attach($tags);
        }
        
        $post->load('tags');
    
        return $post;
    }
    

    public function getPostsFull()
{
    $posts = Post::all();
    foreach ($posts as $post) {
        $post->owner = $post->user()->first();
        $post->vote_count = $post->votes()->count();
        $post->comment_count = $post->comments()->count();
    }
    
    foreach ($posts as $post) {
        $post->tags = $post->tags()->get();
    }

    return $posts;
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
        dd($post->delete());
        
        return $post->delete();
    }

    public function getPostsByUser($userId)
    {
        return Post::where('user_id', $userId)->get();
    }



}
