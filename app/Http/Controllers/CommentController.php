<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CommentRepository;
use App\Models\Comment;

class CommentController extends Controller
{
    // Declare the property outside the constructor
    private CommentRepository $commentRepository;

    // Constructor to inject the CommentRepository
    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    // Insert a new comment
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

    // Delete a comment
    public function destroy($commentId)
    {
        // Find the comment by its ID
        $comment = Comment::find($commentId);

        // If the comment doesn't exist, return an error
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        // Delete the comment
        $comment->delete();

        // Return a success response
        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
