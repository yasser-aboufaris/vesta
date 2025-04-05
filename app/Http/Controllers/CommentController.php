<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CommentRepository;

class CommentController extends Controller
{
    private CommentRepository $commentRepository;

    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:255',
        ]);

        // Use the repository to create the new comment
        $comment = $this->commentRepository->create($validated, $id);

        return response()->json($comment, 201);
    }

    
}
