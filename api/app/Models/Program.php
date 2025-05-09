<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'user_id',
        'image'
    ];
    

    public function User(){
        return $this->belongsTo(User::class);
    }
    
    public function Day(){

        return $this->hasMany(Day::class);

    }

}
