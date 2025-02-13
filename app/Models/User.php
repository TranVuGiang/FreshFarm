<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\ShippingAddress;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id_user';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'name',
        'email',
        'role',
        'login_attempts',
        'last_login_attempt',
        'email_verified_at',
        'password',
        'remember_token',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'login_attempts' => 'integer',
        'last_login_attempt' => 'datetime',
        'status' => 'integer',
    ];

    protected $dates = [
        'email_verified_at',
        'last_login_attempt',
        'created_at',
        'updated_at',
    ];

    /**
     * Get all shipping addresses for the user
     */
    public function shippingAddresses()
    {
        return $this->hasMany(ShippingAddress::class, 'id_user', 'id_user');
    }

    /**
     * Get the default shipping address for the user
     */
    public function defaultShippingAddress()
    {
        return $this->hasOne(ShippingAddress::class, 'id_user', 'id_user')
            ->where('is_default', true);
    }
}
