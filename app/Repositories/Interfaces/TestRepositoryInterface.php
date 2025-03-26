<?php 
interface TestRepositoryInterface{
    public function GetBySpeciality($id);
    public function InsertIntoSpeciality();
    public function create(array $data);
    public function delete($id);
}