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
    public function index()
    {
        $comments = $this->commentRepository->all();
        return response()->json($comments);
    }
    public function show($id)
    {
        $comment = $this->commentRepository->find($id);
        return response()->json($comment);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'content' => 'required|string|max:255',
            'post_id' => 'required|integer|exists:posts,id',
        ]);
        $comment = $this->commentRepository->create($validatedData);
        return response()->json($comment, 201);
    }
}
