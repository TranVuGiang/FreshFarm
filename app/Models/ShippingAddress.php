<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingAddress extends Model
{
    use HasFactory;

    protected $table = 'shipping_addresses';
    protected $primaryKey = 'id_shipping_address';

    protected $fillable = [
        'id_user',
        'recipient_name',
        'address',
        'phone',
        'is_default',
         'status'
    ];

    protected $casts = [
        'is_default' => 'boolean',
         'status'=>'boolean'
    ];

    /**
     * Get the user that owns the shipping address
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    /**
     * Get the bills using this shipping address
     */
    public function bills()
    {
        return $this->hasMany(bill::class, 'id_shipping_address', 'id_shipping_address');
    }
}
