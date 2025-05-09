<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('day_meals', function (Blueprint $table) {   // singular-singular is Eloquent’s default
            $table->id();

            $table->foreignId('day_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->foreignId('meal_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->unsignedInteger('grams');
            $table->timestamps();

            $table->unique(['day_id', 'meal_id']);  // optional but useful
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('day_meals');          // ✅ matches the name in up()
    }
};
