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

    public function store(Request $request, $postId)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $comment = $this->commentRepository->create([
            'content' => $validated['content']
        ], $postId);

        return response()->json($comment, 201);
    }

    public function destroy($commentId)
    {
        $deleted = $this->commentRepository->delete($commentId);

        if (!$deleted) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
