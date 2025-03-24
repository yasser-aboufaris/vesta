<?php

namespace App\Http\Controllers;
use App\Models\Food;
use Illuminate\Http\Request;

class CaloriesController extends Controller
{
    function calculateCalories($weight, $height, $age, $sex, $activityLevel = 1.2) {
        // Calculate BMR using Mifflin-St Jeor Equation
        if (strtolower($sex) === "male") {
            $bmr = 10 * $weight + 6.25 * $height - 5 * $age + 5;
        } else {
            $bmr = 10 * $weight + 6.25 * $height - 5 * $age - 161;
        }
    
        $caloriesNeeded = $bmr * $activityLevel;
    
        return round($caloriesNeeded);
    }

    function estimateWeightChange($caloriesEaten, $weight, $height, $age, $sex, $activityLevel, $days) {
        $caloriesBurned = calculateCalories($weight, $height, $age, $sex, $activityLevel);
        
        $calorieBalance = $caloriesEaten - $caloriesBurned;
    
        $weightChange = ($calorieBalance * $days) / 7700;
    
        return round($weightChange, 2);
    }

    function calculateDailyCaloriesForGoal($currentWeight, $goalWeight, $height, $age, $sex, $activityLevel, $days) {
        $caloriesBurned = calculateCalories($currentWeight, $height, $age, $sex, $activityLevel);
    
        $weightChange = $goalWeight - $currentWeight;
    
        $totalCaloricChange = $weightChange * 7700;
    
        $dailyCaloricAdjustment = $totalCaloricChange / $days;
        $targetCaloriesEaten = $caloriesBurned + $dailyCaloricAdjustment;
    
        return round($targetCaloriesEaten);
    }
    
}
