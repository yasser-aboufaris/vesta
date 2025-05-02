<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\VoteRepositoryInterface;
use Illuminate\Support\Facades\Auth;
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

        $userId = Auth::id();

        // Optional: delete existing vote first to avoid duplicate
        $this->voteRepository->deleteVote($request->post_id, $userId);

        $vote = $this->voteRepository->insertVote([
            'user_id' => $userId,
            'post_id' => $request->post_id,
            'vote_type' => $request->vote_type,
        ]);

        return response()->json(['message' => 'Vote recorded successfully.', 'vote' => $vote], 201);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'post_id' => 'required|integer|exists:posts,id',
        ]);

        $userId = Auth::id();

        $deleted = $this->voteRepository->deleteVote($request->post_id, $userId);

        if ($deleted) {
            return response()->json(['message' => 'Vote removed successfully.']);
        }

        return response()->json(['message' => 'No vote found to delete.'], 404);
    }

}
