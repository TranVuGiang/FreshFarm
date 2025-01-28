<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $primaryKey = 'id_product';
    protected $fillable = [
        'name',
        'id_categories',
        'price',
        'image',
        'description',
        'stock_quantity',
        'status',
    ];

    public function category()
{
    return $this->belongsTo(Category::class, 'id_categories', 'id_categories');
}

}
