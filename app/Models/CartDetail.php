<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartDetail extends Model
{
    protected $table = 'cart_details';
    protected $primaryKey = 'id_cart_detail';

    protected $fillable = [
        'id_cart',
        'id_product',
        'quantity',
        'price'
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class, 'id_cart', 'id_cart');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product', 'id_product');
    }
}
