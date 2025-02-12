<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\bill;
use App\Models\billdetail;
use Carbon\Carbon;
class AmdinManageOrder extends Controller
{
     public function getOrders(Request $request)
     {
         try {
             $query = Bill::with(['user', 'billDetails.product']);

             // Tìm kiếm theo status nếu có
             if ($request->has('status')) {
                 $query->where('status', $request->status);
             }

             // Tìm kiếm theo payment_status nếu có
             if ($request->has('payment_status')) {
                 $query->where('payment_status', $request->payment_status);
             }

             // Tìm kiếm theo khoảng thời gian
             if ($request->has('from_date') && $request->has('to_date')) {
                 $query->whereBetween('created_at', [
                     Carbon::parse($request->from_date)->startOfDay(),
                     Carbon::parse($request->to_date)->endOfDay()
                 ]);
             }

             $orders = $query->orderBy('created_at', 'desc')
                            ->paginate(10);

             return response()->json([
                 'success' => true,
                 'data' => $orders
             ]);
         } catch (\Exception $e) {
             return response()->json([
                 'success' => false,
                 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
             ], 500);
         }
     }

     // Lấy chi tiết một đơn hàng
     public function getOrderDetail($id)
     {
         try {
             $order = Bill::with(['user', 'billDetails.product'])
                         ->findOrFail($id);

             return response()->json([
                 'success' => true,
                 'data' => $order
             ]);
         } catch (\Exception $e) {
             return response()->json([
                 'success' => false,
                 'message' => 'Không tìm thấy đơn hàng'
             ], 404);
         }
     }

     // Cập nhật trạng thái đơn hàng
     public function updateOrderStatus(Request $request, $id)
     {
         try {
             $request->validate([
                 'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
                 'payment_status' => 'required|in:pending,paid,failed'
             ]);

             $order = Bill::findOrFail($id);
             $order->status = $request->status;
             $order->payment_status = $request->payment_status;
             $order->save();

             return response()->json([
                 'success' => true,
                 'message' => 'Cập nhật trạng thái đơn hàng thành công',
                 'data' => $order
             ]);
         } catch (\Exception $e) {
             return response()->json([
                 'success' => false,
                 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
             ], 500);
         }
     }

     // Xóa đơn hàng
     public function deleteOrder($id)
     {
         try {
             $order = Bill::findOrFail($id);

             // Xóa chi tiết đơn hàng trước
             $order->billDetails()->delete();
             // Sau đó xóa đơn hàng
             $order->delete();

             return response()->json([
                 'success' => true,
                 'message' => 'Xóa đơn hàng thành công'
             ]);
         } catch (\Exception $e) {
             return response()->json([
                 'success' => false,
                 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
             ], 500);
         }
     }


}
