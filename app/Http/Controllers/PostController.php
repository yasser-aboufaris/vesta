<?php

namespace App\Http\Controllers;

use App\Repositories\PostRepositoryInterface;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function index()
    {
        $posts = $this->postRepository->all()->load('tags');
        return response()->json($posts);
    }

    public function show($id)
    {
        try {
            $post = $this->postRepository->find($id)->load('tags');
            return response()->json($post);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Post not found'], 404);
        }
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'owner_id' => ['required', 'exists:users,id'],
            'tags' => ['array'],
            'tags.*' => ['exists:tags,id'],
        ]);
        

        $post = $this->postRepository->create($data);
        $post->tags()->sync($request->input('tags', []));

        return response()->json($post->load('tags'), 201);
    }

    public function update(UpdatePostRequest $request, $id)
    {
        try {
            $data = $request->validate([
                'title' => ['required', 'string', 'max:255'],
                'content' => ['required', 'string'],
                'owner_id' => ['required', 'exists:users,id'],
                'tags' => ['array'],
                'tags.*' => ['exists:tags,id'],
            ]);
            

            $post = $this->postRepository->update($id, $data);
            $post->tags()->sync($request->input('tags', []));

            return response()->json($post->load('tags'));
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
