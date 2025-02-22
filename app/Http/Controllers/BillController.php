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
use App\Enums\BillStatusEnum;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Enums\PaymentMethodStatus;

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
            $bill->id_shipping_address=$request->id_shipping_address;
            $bill->total = $cart->total_price;
            $bill->payment_status = PaymentStatus::NOT_PAID;
            $bill->payment_method = $request->input('payment_method', PaymentMethodStatus::CASH);
            $bill->status = OrderStatus::ORDER;
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

    public function getMyOrder()
    {
         try{
            $order= bill::with(['billDetails.product'])
            ->where('id_user',Auth::id())
            ->orderBy('created_at','desc')->get();
            return response()->json([
                'message'=>'Lấy thông tin thành công',
                'success'=>true,
                'data'=>$order
            ],200);
         }catch(\Exception $e)
         {
            return response()->json([
                'message'=>'có lỗi xảy ra: '.$e->getMessage()
            ],500);
         }
    }

    public function getMyOrderDetail($id_bill)
    {
        try
        {
            $order = bill::with(['billDetails.product', 'user'])
            ->where('id_bill', $id_bill)
            ->where('id_user', Auth::id())
            ->first();
            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy đơn hàng'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message'=>'Lấy thông tin thành công',
                'data' => $order
            ]);
        }catch(\Exception $e)
        {
            return response()->json([
                'message'=>'có lỗi xảy ra: '.$e->getMessage()],500);
        }
    }

    public function cancelOrder($id_bill)
    {
        try{
            $order = bill::where('id_bill',$id_bill)
            ->where('id_user',Auth::id())->first();
            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy đơn hàng'
                ], 404);
            }
             if (!in_array($order->status, [OrderStatus::ORDER,OrderStatus::PACK])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không thể hủy đơn hàng ở trạng thái này'
                ], 400);
            }

            $order->status =OrderStatus::DESTROY;
            $order->save();

            return response()->json([
                'success' => true,
                'message' => 'Hủy đơn hàng thành công'
            ]);


        }catch(\Exception $e)
        {
            return response()->json([
                'message'=>'có lỗi xảy ra: '.$e->getMessage()],500);
        }
    }
}
