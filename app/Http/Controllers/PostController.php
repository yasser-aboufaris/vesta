<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    public function show($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'does not exist'], 404);
        }
        return response()->json($post);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'owner_id' => 'required|exists:users,id',
            'tags' => 'array|exists:tags,id'
        ]);

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'owner_id' => $request->owner_id,
            'tags' => $request->tags,

        ]);

        return response()->json($post, 201);
    }
    


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'owner_id' => 'required|exists:users,id',
        ]);

        $post->update([
            'title' => $request->title,
            'content' => $request->content,
            'owner_id' => $request->owner_id,
        ]);

        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
