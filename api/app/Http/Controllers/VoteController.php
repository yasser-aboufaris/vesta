<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\VoteRepositoryInterface;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Repositories\VoteRepository;

class VoteController extends Controller
{
    protected $voteRepository;

    public function __construct(VoteRepository $voteRepository)
    {
        $this->voteRepository = $voteRepository;
    }

    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|integer|exists:posts,id',
            'vote_type' => ['required', Rule::in([1, -1])],
        ]);

        $userId = Auth::id();

        $vote = $this->voteRepository->insertVote([
            'user_id' => $userId,
            'post_id' => $request->post_id,
            'vote_type' => $request->vote_type,
        ]);

        return response()->json(['message' => 'Vote stored successfully.', 'vote' => $vote], 201);
    }
    public function destroy($post_id)
    {   
        $user_id = Auth::id();
        $this->voteRepository->deleteVote($post_id, $user_id);
        return response()->json(['message' => 'Vote deleted successfully.'], 200);
    }
}
