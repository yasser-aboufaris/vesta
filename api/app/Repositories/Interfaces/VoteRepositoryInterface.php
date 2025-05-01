<?php

namespace App\Repositories\Interfaces;

interface VoteRepositoryInterface
{

    public function insertVote(array $data);
    public function deleteVote(int $postId, int $userId);

    public function countVotesForPost(int $postId);
}
