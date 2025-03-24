<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\CommentRepositoryInterface;
use App\Repositories\CommentRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(CommentRepositoryInterface::class, CommentRepository::class);
    }
    

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        
    }


}
