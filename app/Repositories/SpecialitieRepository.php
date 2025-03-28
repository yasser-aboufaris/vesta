<?php

namespace App\Http\Controllers;

use App\Interfaces\SpecialitieRepositoryInterface;
use Illuminate\Http\Request;

class SpecialityController extends Controller
{
    protected $specialityRepository;
    protected $testRepository;
    protected $QuestionRepository;

    public function __construct(SpecialitieRepositoryInterface $specialityRepository )
    {
        $this->specialityRepository = $specialityRepository;
    }

    public function index()
    {
        return response()->json($this->specialityRepository->all());
    }

    public function show($id)
    {
        return response()->json($this->specialityRepository->find($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:specialities,name',
        ]);

        return response()->json($this->specialityRepository->create($data), 201);
    }

    public function destroy($id)
    {
        $this->specialityRepository->delete($id);
        return response()->json(['message' => 'Speciality deleted successfully']);
    }
}
