<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function index()
    {
        $product = Product::paginate(5);
        return response()->json([
            'success'=>true,
            'data'=>$product,
        ],200);
    }

    public function showByCategory($idcategory)
    {
        $category= Category::find($idcategory);
        if(!$category)
        {
            return response()->json([
                'success'=>false,
                'message'=>"Not found Category",
            ],404);
        }

        $product = Product::where('id_categories',$idcategory)->paginate(5);
        return response()->json([
            'success'=>true,
            'data'=>$product,
        ],200);
    }

    public function searchByName(Request $request)
    {

        $name = $request->query('name');


        if (!$name) {
            return response()->json([
                'success' => false,
                'message' => 'Name parameter is required',
            ], 400);
        }


        $products = cache()->remember("search_products_{$name}", 3600, function () use ($name) {
            return Product::where('name', 'like', '%' . $name . '%')->paginate(5);
        });

        return response()->json([
            'success' => true,
            'data' => $products,
        ], 200);
    }

}
