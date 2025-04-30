<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;

class VoteController extends Controller
{
    public function insert(Request $request)
    {
        $validatedData = $request->validate([
            'post_id' => 'required|integer|exists:posts,id',
            'user_id' => 'required|integer|exists:users,id',
            'vote_type' => 'required|string|in:upvote,downvote',
        ]);

        Vote::where('post_id', $validatedData['post_id'])
            ->where('user_id', $validatedData['user_id'])
            ->delete();
        Vote::create($validatedData);
        
        return response()->json($vote, 201);    
    }
    
}
