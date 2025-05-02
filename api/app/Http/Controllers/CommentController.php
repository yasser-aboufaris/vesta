<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\CommentRepostoryInsterface;

class CommentController extends Controller
{
    protected $commentRepository;
    public function __construct(CommentRepostoryInsterface $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }
}
