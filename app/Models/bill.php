<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    protected $table = 'bills';
    protected $primaryKey = 'id_bill';
    public $timestamps = true;

    protected $fillable = [
        'id_user',
        'id_shipping_address',
        'email',
        'delivery_date',
        'total',
        'payment_status',
        'payment_method',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function shippingAddress()
    {
        return $this->belongsTo(ShippingAddress::class, 'id_shipping_address', 'id_shipping_address');
    }

    public function billDetails()
    {
        return $this->hasMany(BillDetail::class, 'id_bill', 'id_bill');
    }
}
