<?php

use App\Http\Controllers\Admin\AuthenAdmin\Authen;
use Illuminate\Support\Facades\Route;

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
Route::get('/reset-password', function (Request $request) {
    return view('auth.reset-password', [
        'token' => $request->token,
        'email' => $request->email
    ]);
})->name('password.reset');
Route::get('/verify-email/{token}',  [AuthenController::class,'verifyEmail'])->name('verify.email');
