<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class ShoppingCartController extends Controller
{
    //
    public function index()
    {
        $cart = Cart::with(['cartDetails.product'])
            ->where('id_user', Auth::id())
            ->where('status', 1) // active cart
            ->first();

        if (!$cart) {
            return response()->json([
                'message' => 'Giỏ hàng trống'
            ]);
        }

        return response()->json([
            'cart' => $cart,
            'total_price' => $cart->total_price
        ]);
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addToCart(Request $request)
    {
        $request->validate([
            'id_product' => 'required|exists:products,id_product',
            'quantity' => 'required|integer|min:1'
        ]);

        try {
            DB::beginTransaction();


            $product = Product::findOrFail($request->id_product);

            if ($product->stock_quantity < $request->quantity) {
                return response()->json([
                    'message' => 'Số lượng sản phẩm trong kho không đủ'
                ], 400);
            }

            $cart = Cart::firstOrCreate(
                [
                    'id_user' => Auth::id(),
                    'status' => 1
                ],
                [
                    'total_price' => 0
                ]
            );

            $cartDetail = CartDetail::where('id_cart', $cart->id_cart)
                ->where('id_product', $request->id_product)
                ->first();

            if ($cartDetail) {
                $newQuantity = $cartDetail->quantity + $request->quantity;
                if ($product->stock_quantity < $newQuantity) {
                    return response()->json([
                        'message' => 'Số lượng sản phẩm trong kho không đủ'
                    ], 400);
                }

                $cartDetail->quantity = $newQuantity;
                $cartDetail->save();
            } else {

                CartDetail::create([
                    'id_cart' => $cart->id_cart,
                    'id_product' => $request->id_product,
                    'quantity' => $request->quantity,
                    'price' => $product->price
                ]);
            }
            $this->updateCartTotal($cart->id_cart);

            DB::commit();

            return response()->json([
                'message' => 'Thêm vào giỏ hàng thành công',
                'cart' => Cart::with('cartDetails.product')->find($cart->id_cart)
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateQuantity(Request $request, $id_cart_detail)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        try {
            DB::beginTransaction();

            $cartDetail = CartDetail::whereHas('cart', function($query) {
                $query->where('id_user', Auth::id())
                      ->where('status', 1);
            })->findOrFail($id_cart_detail);

            $product = Product::find($cartDetail->id_product);

            if ($product->stock_quantity < $request->quantity) {
                return response()->json([
                    'message' => 'Số lượng sản phẩm trong kho không đủ'
                ], 400);
            }

            $cartDetail->quantity = $request->quantity;
            $cartDetail->save();

            $this->updateCartTotal($cartDetail->id_cart);

            DB::commit();

            return response()->json([
                'message' => 'Cập nhật số lượng thành công',
                'cart_detail' => $cartDetail
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }


    public function removeFromCart($id_cart_detail)
    {
        try {
            DB::beginTransaction();

            $cartDetail = CartDetail::whereHas('cart', function($query) {
                $query->where('id_user', Auth::id())
                      ->where('status', 1);
            })->findOrFail($id_cart_detail);

            $id_cart = $cartDetail->id_cart;
            $cartDetail->delete();

            $this->updateCartTotal($id_cart);

            DB::commit();

            return response()->json([
                'message' => 'Đã xóa sản phẩm khỏi giỏ hàng'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    public function clearCart()
    {
        try {
            DB::beginTransaction();

            $cart = Cart::where('id_user', Auth::id())
                       ->where('status', 1)
                       ->first();

            if ($cart) {
                CartDetail::where('id_cart', $cart->id_cart)->delete();
                $cart->total_price = 0;
                $cart->save();
            }

            DB::commit();

            return response()->json([
                'message' => 'Đã xóa toàn bộ giỏ hàng'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }


    private function updateCartTotal($id_cart)
    {
        $cart = Cart::find($id_cart);
        $total = CartDetail::where('id_cart', $id_cart)
            ->sum(DB::raw('price * quantity'));

        $cart->total_price = $total;
        $cart->save();
    }
}
