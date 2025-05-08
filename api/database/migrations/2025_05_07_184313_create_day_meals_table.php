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
        Schema::create('day_meals', function (Blueprint $table) {
            $table->id();

            // Declare foreign key columns manually
            $table->unsignedBigInteger('day_id');
            $table->unsignedBigInteger('meal_id');

            // Foreign key constraints
            $table->foreign('day_id')->references('id')->on('days')->onDelete('cascade');
            $table->foreign('meal_id')->references('id')->on('meals')->onDelete('cascade');

            $table->unsignedInteger('grams'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('day_meals');
    }
};
