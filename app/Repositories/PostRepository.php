<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\PostReposotoryInterface;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $postRepository;

    public function __construct(PostReposotoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function index()
    {
        $posts = $this->postRepository->all();
        return response()->json($posts);
    }

    public function show($id)
    {
        try {
            $post = $this->postRepository->find($id);
            return response()->json($post);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Post not found'], 404);
        }
    }

    public function store(StorePostRequest $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'owner_id' => 'required|exists:users,id',
        ]);

        $data = [
            'title' => $request->title,
            'content' => $request->content,
            'owner_id' => $request->owner_id,
        ];

        $post = $this->postRepository->create($data);
        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'owner_id' => 'required|exists:users,id',
            ]);
            
            $data = [
                'title' => $request->title,
                'content' => $request->content,
                'owner_id' => $request->owner_id,
            ];
            
            $post = $this->postRepository->update($id, $data);
            return response()->json($post);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Post not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $this->postRepository->delete($id);
            return response()->json(['message' => 'Post deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Post not found'], 404);
        }
    }
}
