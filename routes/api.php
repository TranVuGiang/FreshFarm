<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthenController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AuthenAdmin\AuthenAdminController;
use App\Http\Controllers\Admin\AmdinManageOrder;
use App\Http\Controllers\ShippingAdressController;

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



Route::middleware('auth:sanctum')->get('/user', [AuthenController::class, 'getCurrentUser']);
Route::middleware('auth:sanctum')->put('/user/update', [AuthenController::class, 'updateUser']);
Route::middleware('auth:sanctum')->put('/user/updateAddress', [AuthenController::class, 'updateAddressShipping']);
Route::post('/change-password', [AuthenController::class, 'changePassword'])->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthenController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthenController::class, 'resetPassword']);
Route::get('/verify-email/{token}', [AuthenController::class,'verifyEmail'])->name('verify.email');
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
    Route::post('/checkout',[BillController::class,'checkout']);

    Route::get('/orders', [BillController::class, 'getMyOrder']);
    Route::get('/orders/{id_bill}', [BillController::class, 'getMyOrderDetail']);
    Route::post('/orders/{id_bill}/cancel', [BillController::class, 'cancelOrder']);

    //ShippingAdress
    Route::prefix('address')->group(function(){
        Route::get('/getAddress',[ShippingAdressController::class,'index']);
        Route::post('/addAddress',[ShippingAdressController::class,'store']);
        Route::put('/updateAddress/{id}',[ShippingAdressController::class,'update']);
        Route::delete('/deleteAddress/{id}',[ShippingAdressController::class,'destroy']);
    });


});


//admin


Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthenAdminController::class, 'login']);
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('/logout', [AuthenAdminController::class, 'logout']);
        Route::get('/profile', [AuthenAdminController::class, 'profile']);

        Route::prefix('products')->group(function () {
            Route::get('/', [AdminProductController::class, 'index']);
            Route::post('/', [AdminProductController::class, 'store']);
            Route::post('/{id}', [AdminProductController::class, 'update']);
            Route::delete('/{id}', [AdminProductController::class, 'destroy']);
        });


        Route::prefix('categories')->group(function () {
            Route::get('/', [AdminCategoryController::class, 'index']);
            Route::post('/', [AdminCategoryController::class, 'store']);
            Route::post('/{id}', [AdminCategoryController::class, 'update']);
            Route::delete('/{id}', [AdminCategoryController::class, 'destroy']);
        });

        Route::prefix('orders')->group(function () {
            Route::get('/getorder', [AmdinManageOrder::class, 'getOrders']);
            Route::get('/getorderdetail/{id}', [AmdinManageOrder::class, 'getOrderDetail']);
            Route::put('/update/{id}/status', [AmdinManageOrder::class, 'updateOrderStatus']);
        });
    });
});
