<?php

namespace App\Services;

use App\Reposotories\CommentReposotory;
class PostService{
    protected $postRepository;
    public function __construct(PostRepositoryInterface $postRepository){
        $this->postRepository = $postRepository;
    }

    
}