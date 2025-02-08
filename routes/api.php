<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthenController;
use App\Http\Controllers\ShoppingCartController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/showProduct', [ProductController::class, 'index']);
Route::get('/products/category/{idcategory}', [ProductController::class, 'showByCategory']);
Route::get('/searchProducts', [ProductController::class, 'searchByName']);
Route::get('/products/{id}', [ProductController::class, 'showDetails']);
Route::get('/category',[ProductController::class, 'showCategory']);
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthenController::class, 'register']);
    Route::post('/login', [AuthenController::class, 'login']);
    Route::post('/logout', [AuthenController::class, 'logout'])->middleware('auth:sanctum');
});
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('cart')->group(function () {
        Route::get('/', [ShoppingCartController::class, 'index']);
        Route::post('/add', [ShoppingCartController::class, 'addToCart']);
        Route::put('/detail/{id_cart_detail}', [ShoppingCartController::class, 'updateQuantity']);
        Route::delete('/detail/{id_cart_detail}', [ShoppingCartController::class, 'removeFromCart']);
        Route::delete('/', [ShoppingCartController::class, 'clearCart']);
    });
});
