<?php
namespace App\Repositories\Interfaces;
interface TagRepositoryInterface
{
    public function all();
    public function create(array $data);
    public function delete($id);
}   
