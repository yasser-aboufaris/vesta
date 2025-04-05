<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CommentRepository;

class CommentController extends Controller
{
    // Declare the property for CommentRepository
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

        // Use the repository's create method to insert the comment
        $comment = $this->commentRepository->create([
            'content' => $validated['content']
        ], $postId);

        return response()->json($comment, 201);
    }

    // Delete a comment
    public function destroy($commentId)
    {
        // Use the repository's delete method to remove the comment
        $deleted = $this->commentRepository->delete($commentId);

        // If the comment was not found, return an error
        if (!$deleted) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        // Return a success response
        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
