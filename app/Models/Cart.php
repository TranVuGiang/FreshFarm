<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';
    protected $primaryKey = 'id_cart';

    protected $fillable = [
        'id_user',
        'total_price',
        'status'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }


    public function cartDetails()
    {
        return $this->hasMany(CartDetail::class, 'id_cart', 'id_cart');
    }
}
