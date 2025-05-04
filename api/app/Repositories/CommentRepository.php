<?php
namespace App\Repositories;
use App\Models\Comment;
use App\Repositories\Interfaces\CommentRepositoryInterface;
class CommentRepository implements CommentRepositoryInterface
{
    public function all()
    {
        return Comment::all();
    }
    public function create(array $data)
    {
        return Comment::create($data);
    }

    public function delete($id)
    {
        $comment = Comment::find($id);
        
        if ($comment) {
            return $comment->delete();
        }
        return false;
    }
 
    public function findByPostId($postId)
    {
        return Comment::where('post_id', $postId)->get();
    }


}