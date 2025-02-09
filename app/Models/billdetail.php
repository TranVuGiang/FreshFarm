<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class billdetail extends Model
{
    use HasFactory;
    protected $table = 'bill_products';
    public $timestamps = true;

    protected $fillable = [
        'id_bill',
        'id_product',
        'quantity',
        'price',
        'rating',
        'comment'
    ];

    public function bill()
    {
        return $this->belongsTo(Bill::class, 'id_bill', 'id_bill');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product', 'id_product');
    }
}
