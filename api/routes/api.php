<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\ExerciseController;

/*
|--------------------------------------------------------------------------
| Public Routes (No Auth Required)
|--------------------------------------------------------------------------
*/

Route::post('auth/signup/client', [ClientController::class,'signUp']);
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('/trainer/signup', [TrainerController::class, 'signUp']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Require Sanctum Auth)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/y', function () {
        return response()->json([
            'products' => [
                ['id' => 1, 'name' => 'Product 1', 'price' => 100],
                ['id' => 2, 'name' => 'Product 2', 'price' => 200],
            ]
        ]);
    });

    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::get('posts', [PostController::class, 'index']);
    Route::get('post/{id}', [PostController::class, 'show']);
    Route::post('post', [PostController::class, 'store']);
    Route::put('post/{id}', [PostController::class, 'update']);
    Route::delete('post/{id}', [PostController::class, 'destroy']);
    Route::post('posts', [PostController::class, 'bulkStore']);

    Route::post('post/{id}/comment', [CommentController::class, 'store']);
    Route::post('/comments', [CommentController::class, 'store']);


    Route::get('tags', [TagController::class, 'index']);
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::post('/programs', [ProgramController::class, 'store']);
    Route::get('/programs/{id}', [ProgramController::class, 'show']);
    Route::put('/programs/{id}', [ProgramController::class, 'update']);
    Route::delete('/programs/{id}', [ProgramController::class, 'destroy']);

    Route::post('/votes', [VoteController::class, 'store']);
    Route::delete('/votes', [VoteController::class, 'destroy']);
    Route::post('/meal', [MealController::class, 'store']);
    Route::delete('/meal/{id}', [MealController::class, 'delete']);
});

Route::get('/meals', [MealController::class, 'index']);
Route::get('/exercises', [ExerciseController::class, 'index']);
