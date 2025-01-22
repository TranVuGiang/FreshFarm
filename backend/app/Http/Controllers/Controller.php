<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;

class Controller extends BaseController
{
    public function getAllUsers()
    {
        $taikhoan = User::all();
        return response()->json($taikhoan);
    }
}
