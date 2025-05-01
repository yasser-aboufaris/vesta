<?php
namespace App\Repositories;

use App\Models\Tag;
use App\Repositories\Interfaces\TagRepositoryInterface;

class TagRepository implements TagRepositoryInterface
{
    public function all()
    {
        return Tag::all();
    }

    public function create(array $data)
    {
        return Tag::create($data);
    }
    

    public function delete($id)
    {
        $tag = Tag::find($id);
        
        if ($tag) {
            return $tag->delete();
        }

        return false;
    }
}