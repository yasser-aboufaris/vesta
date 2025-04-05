<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Repositories\Interfaces\CommentRepositoryInterface;

class CommentRepository 
{
    public function GetByPost($postId)
    {
        return Comment::where('post_id', $postId)->get();
    }

    public function GetByUser($userId)
    {
        return Comment::where('owner_id', $userId)->get();
    }

    public function create(array $data, $idPost)
    {

        $data['owner_id'] = 8; 
        $data['post_id'] = $idPost;
        return Comment::create($data);
    }

    public function delete($id)
    {
        return Comment::findOrFail($id)->delete();
    }
}
