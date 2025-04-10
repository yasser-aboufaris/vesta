<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TrainerController extends Controller
{
    protected $trainerRepository;

    public function __construct( TrainerRepositoryInterface $repo){

    }
}
