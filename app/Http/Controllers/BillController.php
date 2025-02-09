<?php

namespace App\Http\Controllers;

use App\Models\bill;
use App\Models\Cart;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\CartDetail;
class BillController extends Controller
{
    //
    public function checkout(Request $request)
    {
        try{
            DB::beginTransaction();
            $cart= Cart::with('cartDetails.product')->where('id_user',Auth::id())
            ->where('status',1)->first();

            if(!$cart||$cart->cartDetails->isEmpty())
            {
                return response()->json(['message'=>'Giỏ hàng rỗng'],400);
            }
            //kiểm tra tồn kho trước khi tạo hóa đơn
            foreach($cart->cartDetails as $cartDetail)
            {
                if($cartDetail->product->stock_quantity<$cartDetail->quantity)
                {
                    return response()->json([
                        'message' => "Sản phẩm '{$cartDetail->product->name}' không đủ số lượng trong kho"
                    ], 400);
                }
            }

            $bill = new bill();
            $bill->id_user = Auth::id();
            $bill->email = Auth::user()->email;
            $bill->delivery_date = now()->addDays(3);
            $bill->total = $cart->total_price;
            $bill->payment_status = 0; // 0: Chưa thanh toán, 1: Đã thanh toán
            $bill->payment_method = $request->input('payment_method', 1); // 1: Tiền mặt, 2: Chuyển khoản
            $bill->status = 1; // 1: Đang xử lý
            $bill->save();

            foreach ($cart->cartDetails as $cartDetail) {
                DB::table('bill_products')->insert([
              'id_bill' => $bill->id_bill,
                    'id_product' => $cartDetail->id_product,
                    'quantity' => $cartDetail->quantity,
                    'price' => $cartDetail->price,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
            // Cập nhật tồn kho sản phẩm
            $cartDetail->product->stock_quantity -= $cartDetail->quantity;
            $cartDetail->product->save();

            CartDetail::where('id_cart', $cart->id_cart)->delete();
            $cart->delete();

            DB::commit();

            return response()->json([
                'message' => 'Thanh toán thành công',
                'bill' => $bill
            ]);
        }catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'message'=>'có lỗi xảy ra: '.$e->getMessage()
            ],500);
        }
    }
}
