<?php

namespace App\Repositories;

use App\Models\Vote;
use App\Repositories\Interfaces\VoteRepositoryInterface;

class VoteRepository implements VoteRepositoryInterface
{
    public function insertVote(array $data)
    {
        $this->deleteVote($data['post_id'], $data['user_id']);

        return Vote::create($data);
    }

    public function deleteVote(int $postId, int $userId)
    {
        return Vote::where('post_id', $postId)
                   ->where('user_id', $userId)
                   ->delete();
    }
    public function VoteDelete($id)
    {
        return Vote::destroy($id);
    }
    public function getVotesPerUser(int $userId)
    {
        return Vote::where('user_id', $userId)->get();
    }
}
