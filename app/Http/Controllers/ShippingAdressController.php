<?php

namespace App\Http\Controllers;

use App\Models\ShippingAddress;
use Illuminate\Http\Request;

class ShippingAdressController extends Controller
{
    //
    public function index()
    {
        try{

            $address= ShippingAddress::where('id_user',auth()->user()->id_user)
            ->where('status', true)->get();
            if($address->isEmpty())
            {
                return response()->json([
                    'status'=>false,
                    'message'=>'Chưa có địa chỉ'
                ],404);
            }
            return response()->json([
                'success' => true,
                'message' => 'Lấy thông tin thành công',
                'data' => $address
            ],200);
        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try{
            $request->validate([
                'recipient_name'=>'required|string|max:255',
                'address'=>'required|string|max:255',
                'phone'=>'required|string|max:255'
            ]);
            $userId = auth()->user()->id_user;

        $existingAddress = ShippingAddress::where('id_user', $userId)
        ->where('address', $request->address)
        ->where('recipient_name', $request->recipient_name)
        ->where('phone', $request->phone)
        ->where('status', false)
        ->first();

    if ($existingAddress) {
        if ($request->is_default) {
            ShippingAddress::where('id_user', $userId)->update(['is_default' => false]);
        }

        $existingAddress->update([
            'status' => true,
            'is_default' => $request->is_default ? true : false
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tạo địa chỉ thành công',
            'data' => $existingAddress
        ], 201);
    }

    if ($request->is_default) {
        ShippingAddress::where('id_user', $userId)->update(['is_default' => false]);
    }

    $address = ShippingAddress::create([
        'id_user' => $userId,
        'recipient_name' => $request->recipient_name,
        'address' => $request->address,
        'phone' => $request->phone,
        'is_default' => $request->is_default ? true : false
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Tạo địa chỉ thành công',
        'data' => $address
    ], 201);
        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }

    }

    public function update(Request $request, $id)
    {
        try{
            $request->validate([
                'recipient_name'=>'string|max:255',
                'address'=>'string|max:255',
                'phone'=>'string|max:255'
            ]);
            $address=ShippingAddress::find($id);
            if($address->id_user!=auth()->user()->id_user){
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không có quyền sửa địa chỉ này'
                    ], 403);
                    }
                    if ($request->is_default) {
                        ShippingAddress::where('id_user', auth()->user()->id_user)->update(['is_default' => false]);
                    }
                    $updateData = array_filter($request->only([
                        'recipient_name',
                        'address',
                        'phone',
                        'is_default'
                    ]));
                    $address->update($updateData);

                    return response()->json([
                        'success' => true,
                        'message' => 'Cập nhật thông tin địa chỉ thành công',
                        'data'=>$address
                    ]);
    }
    catch(\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
        ], 500);
    }
    }

    public function destroy($id)
    {
        try{
            $address=ShippingAddress::find($id);
            if(!$address) {
                return response()->json([
                    'success' => false,
                    'message' => 'Địa chỉ không tồn tại'
                ], 404);
            }
            if($address->id_user!=auth()->user()->id_user){
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không có quyền xóa địa chỉ này'
                    ], 403);
                    }
                    $address->update(['status' => false]);

            return response()->json([
                'success' => true,
                'message' => 'Xóa địa chỉ thành công',
            ]);
        }
        catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }
}
