<?php
namespace App\Repositories\Interfaces;

interface CommentRepositoryInterface
{
    public function all();
    public function create(array $data);
    public function delete($id);
    public function findByPostId($postId);
}
