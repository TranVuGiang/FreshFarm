<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bill extends Model
{
    use HasFactory;
    protected $table = 'bills';
    protected $primaryKey = 'id_bill';
    public $timestamps = true;

    protected $fillable = [
        'id_user',
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

    public function billDetails()
    {
        return $this->hasMany(BillDetail::class, 'id_bill', 'id_bill');
    }
}
