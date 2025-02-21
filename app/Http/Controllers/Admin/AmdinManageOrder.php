<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\bill;
use App\Models\billdetail;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
class AmdinManageOrder extends Controller
{
    public function getOrders(Request $request)
    {
        try {
            $query = bill::with(['user', 'billDetails.product', 'shippingAddress']);

            // Tìm kiếm theo status
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            // Tìm kiếm theo payment_status
            if ($request->has('payment_status')) {
                $query->where('payment_status', $request->payment_status);
            }

            // Tìm kiếm theo email
            if ($request->has('email')) {
                $query->where('email', 'like', '%' . $request->email . '%');
            }

            // Tìm kiếm theo khoảng thời gian
            if ($request->has('from_date') && $request->has('to_date')) {
                $query->whereBetween('created_at', [
                    Carbon::parse($request->from_date)->startOfDay(),
                    Carbon::parse($request->to_date)->endOfDay()
                ]);
            }

            $orders = $query->orderBy('created_at', 'desc')
                          ->paginate($request->per_page ?? 10);

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

    public function getOrderDetail($id)
    {
        try {
            $order = bill::with([
                'user',
                'billDetails.product',
                'shippingAddress'
            ])->findOrFail($id);

            $orderSummary = [
                'total_items' => $order->billDetails->sum('quantity'),
                'subtotal' => $order->billDetails->sum(function($detail) {
                    return $detail->price * $detail->quantity;
                }),
                'total' => $order->total,
                'created_date' => $order->created_at->format('d/m/Y H:i:s'),
                'status_history' => $this->getStatusHistory($order)
            ];

            return response()->json([
                'success' => true,
                'data' => [
                    'order' => $order,
                    'summary' => $orderSummary
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy đơn hàng'
            ], 404);
        }
    }

    public function updateOrderStatus(Request $request, $id)
{
    try {
        $request->validate([
            'status' => ['integer', 'between:0,4'],
            'payment_status' => ['nullable', 'integer', 'between:0,2'],
            'note' => 'nullable|string|max:255'
        ]);

        DB::beginTransaction();

        $order = bill::findOrFail($id);
        $oldStatus = $order->status;


        if (!$this->isValidStatusTransition($oldStatus, $request->status)) {
            return response()->json([
                'success' => false,
                'message' => 'Không thể chuyển từ trạng thái ' .
                            OrderStatus::getDescription($oldStatus) .
                            ' sang ' .
                            OrderStatus::getDescription($request->status)
            ], 400);
        }


        if ($request->has('payment_status')) {
            if (!$this->isValidPaymentStatusTransition($order->payment_status, $request->payment_status)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không thể thay đổi trạng thái thanh toán từ ' .
                                PaymentStatus::getDescription($order->payment_status) .
                                ' sang ' .
                                PaymentStatus::getDescription($request->payment_status)
                ], 400);
            }
            $order->payment_status = $request->payment_status;
        }

        $order->status = $request->status;
        $order->save();

        DB::commit();

        $order->load(['user', 'billDetails.product', 'shippingAddress']);
        $order->status_name = OrderStatus::getDescription($order->status);
        $order->payment_status_name = PaymentStatus::getDescription($order->payment_status);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật trạng thái đơn hàng thành công',
            'data' => $order
        ]);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'success' => false,
            'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
        ], 500);
    }
}


    protected function isValidStatusTransition($fromStatus, $toStatus)
    {
        $validTransitions = [
            OrderStatus::ORDER => [OrderStatus::PACK, OrderStatus::DESTROY],
            OrderStatus::PACK => [OrderStatus::TRANSPORT, OrderStatus::DESTROY],
            OrderStatus::TRANSPORT => [OrderStatus::RECEIVE],
            OrderStatus::RECEIVE => [],
            OrderStatus::DESTROY => []
        ];


        if ($toStatus === OrderStatus::DESTROY) {
            if (!in_array($fromStatus, [OrderStatus::ORDER, OrderStatus::PACK])) {
                return false;
            }
        }

        return in_array($toStatus, $validTransitions[$fromStatus] ?? []);
    }

    protected function isValidPaymentStatusTransition($fromStatus, $toStatus)
    {

        $validTransitions = [
            PaymentStatus::NOT_PAID => [PaymentStatus::PAID, PaymentStatus::PAYOFF],
            PaymentStatus::PAID => [PaymentStatus::PAYOFF],
            PaymentStatus::PAYOFF => []
        ];

        return in_array($toStatus, $validTransitions[$fromStatus] ?? []);
    }


}
