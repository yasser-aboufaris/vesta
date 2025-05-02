<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\PostRepositoryInterface;
class PostController extends Controller
{
    private $postRepository;
    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function index()
    {
        $posts = $this->postRepository->getPostsFull();
        return response()->json($posts);
    }

    public function show($id)
    {
        $post = $this->postRepository->find($id);
        return response()->json($post);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        // dd($validatedData);

        $post = $this->postRepository->create($validatedData);
        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $post = $this->postRepository->update($id, $validatedData);
        return response()->json($post);
    }

    public function destroy($id)
    {
        $this->postRepository->delete($id);
        return response()->json(null, 204);
    }       
    

    public function bulkStore(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'posts' => 'required|array',
            'posts.*.title' => 'required|string|max:255',
            'posts.*.content' => 'required|string',
            'posts.*.tags' => 'array',
            'posts.*.tags.*' => 'integer',
        ]);
        // dd($data);
    
        $createdPosts = [];
    
        foreach ($data['posts'] as $postData) {
            $createdPosts[] = $this->postRepository->create($postData);
        }
    
        return response()->json($createdPosts, 201);
    }







}
