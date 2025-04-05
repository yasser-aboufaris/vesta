<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CommentRepository;
use App\Models\Comment;

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

        // Create the new comment
        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => 9,
            'content' => $validated['content'],
        ]);

        return response()->json($comment, 201);
    }

    public function destroy($commentId)
    {
        $comment = Comment::find($commentId);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
