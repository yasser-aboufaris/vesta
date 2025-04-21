<?php 
interface specialitiesRepositoryInterface {
    public function all();
    public function find();
    public function create(array $data);
    public function delete($id);
}