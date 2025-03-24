<?php
namespace App\Reposotories;
use App\Reposotories\Interfaces\CommentReposotoryInterface;
use App\Models\Comment;

class CommentReposotory implements CommentReposotoryInterface
{
    public function all(){
        return Comment::all();
    }

    public function find($id)
    {
        return Comment::findOrFail($id);
    }



    public function create(array $data){
        return Comment::create($data);
    }


    public function update($id, array $data)
    {
        $comment = Comment::findOrFail($id);
        $comment->update($data);
        return $comment;
    }

    public function delete($id){
        Comment::delete($id);
    }


}