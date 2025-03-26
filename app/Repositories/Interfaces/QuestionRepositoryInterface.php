<?php
interface QuestionRepositoryInterface{
    public function getByTest();
    public function insertIntoTest();
    public function checkTruth();
}