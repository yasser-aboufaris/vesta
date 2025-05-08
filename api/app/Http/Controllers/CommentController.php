<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::all();
        return response()->json($comments);
    }

    public function show($id)
    {
        $comment = Comment::findOrFail($id);
        return response()->json($comment);
    }

    public function store(Request $request, $id)
    {
        $validatedData = $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $validatedData['post_id'] = $id;
        $validatedData['owner_id'] = Auth::id();
        // dd($validatedData);

        $comment = Comment::create($validatedData);

        return response()->json($comment, 201);
    }
}
