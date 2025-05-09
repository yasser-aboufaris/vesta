<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
    
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('days_exercises', function (Blueprint $table) {
            $table->id();
    
            $table->unsignedBigInteger('day_id');
            $table->unsignedBigInteger('exercise_id');
    
            $table->foreign('day_id')
                  ->references('id')
                  ->on('days')
                  ->onDelete('cascade');
    
            $table->foreign('exercise_id')
                  ->references('id')
                  ->on('exrcices')
                  ->onDelete('cascade');
    
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('day_exercises');
    }
};
