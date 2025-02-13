<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
use App\Http\Controllers\AuthenController;

Route::post('/forgot-password', [AuthenController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthenController::class, 'resetPassword']);

// Route hiển thị form đặt lại mật khẩu (Laravel Blade)
Route::get('/reset-password/{token}/{email}', function (Request $request, $token, $email) {
    return view('auth.reset-password', [
        'token' => $token,
        'email' => $email
    ]);
});

