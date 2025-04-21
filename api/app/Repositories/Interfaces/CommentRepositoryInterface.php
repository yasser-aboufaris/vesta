<?php 
namespace App\Repositories\Interfaces; 

interface CommentReposotoryInterface
{
    public function GetByPost();
    public function GetByUser();
    public function create(array $data,$idPost);
    public function delete($id);
}
