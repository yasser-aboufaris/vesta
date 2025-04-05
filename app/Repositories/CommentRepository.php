<?php
namespace App\Repositories;

use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Models\Post;

class PostRepository implements PostRepositoryInterface
{

    public function create(array $data)
    {
        return Post::create($data);
    }



    public function delete($id)
    {
        Post::destroy($id);
    }
    public function getByPost($postId)
    {
        return Post::findOrFail($postId)->comments()->get();
    }
    
    
    
}
