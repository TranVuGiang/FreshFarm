<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
class AdminProductController extends Controller
{
    //
    public function index()
    {
        try {
            $products = Product::paginate(10);
            return response()->json([
                'success' => true,
                'message' => 'Lấy danh sách sản phẩm thành công',
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'id_categories' => 'required|exists:categories,id_categories',
                'price' => 'required|numeric|min:0',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'stock_quantity' => 'required|integer|min:0',
                'description' => 'required|string|max:500',
                'weight' => 'nullable|numeric|min:0',
                'origin' => 'nullable|string|max:255',
                'certification' => 'nullable|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => "Dữ liệu không hợp lệ"
                ], 400);
            }

            // Xử lý upload ảnh
            $imagePath = $request->file('image')->store('products', 'public');

            $product = Product::create([
                'name' => $request->name,
                'id_categories' => $request->id_categories,
                'price' => $request->price,
                'image' => $imagePath,
                'stock_quantity' => $request->stock_quantity,
                'description' => $request->description,
                'weight' => $request->weight,
                'origin' => $request->origin,
                'certification' => $request->certification,
                'status' => true
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Thêm sản phẩm thành công',
                'data' => $product
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'name' => 'nullable|string|max:255',
                'id_categories' => 'nullable|exists:categories,id_categories',
                'price' => 'nullable|numeric|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'stock_quantity' => 'nullable|integer|min:0',
                'description' => 'nullable|string|max:500',
                'weight' => 'nullable|numeric|min:0',
                'origin' => 'nullable|string|max:255',
                'certification' => 'nullable|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => "Dữ liệu không hợp lệ"
                ], 400);
            }

            // Chuẩn bị dữ liệu để update
            $updateData = array_filter($request->only([
                'name',
                'id_categories',
                'price',
                'stock_quantity',
                'description',
                'weight',
                'origin',
                'certification'
            ]));

            // Xử lý upload ảnh mới nếu có
            if ($request->hasFile('image')) {
                // Xóa ảnh cũ nếu tồn tại
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }
                $imagePath = $request->file('image')->store('products', 'public');
                $updateData['image'] = $imagePath;
            }

            // Cập nhật sản phẩm
            $product->update($updateData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật sản phẩm thành công',
                'data' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            Storage::disk('public')->delete($product->image);
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa sản phẩm thành công'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
}
}

