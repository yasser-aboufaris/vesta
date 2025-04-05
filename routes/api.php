<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/user/register', [ClientController::class, 'register']);
Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);
Route::get('/posts/owner/{ownerId}', [PostController::class, 'getByOwner']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::post('/user/login', [ClientController::class, 'login']);
Route::put('/posts/id', [PostController::class, 'update']);
Route::delete('/posts/{id}', [PostController::class, 'delete']);
Route::get('/posts/{postId}/comments', [CommentController::class, 'store']);
