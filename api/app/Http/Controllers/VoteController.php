<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\VoteRepositoryInterface;
use Illuminate\Validation\Rule;

class VoteController extends Controller
{
    protected $voteRepository;

    public function __construct(VoteRepositoryInterface $voteRepository)
    {
        $this->voteRepository = $voteRepository;
    }

    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|integer|exists:posts,id',
            'vote_type' => ['required', Rule::in([1, -1])],
        ]);

        $userId = 5;

        $vote = $this->voteRepository->insertVote([
            'user_id' => $userId,
            'post_id' => $request->post_id,
            'vote_type' => $request->vote_type,
        ]);

        return response()->json(['message' => 'Vote stored successfully.', 'vote' => $vote], 201);
    }
}
