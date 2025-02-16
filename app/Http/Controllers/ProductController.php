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
        $product = Product::paginate(15);
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

        $product = Product::where('id_categories',$idcategory)->paginate(15);
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
            return Product::where('name', 'like', '%' . $name . '%')->paginate(15);
        });

        return response()->json([
            'success' => true,
            'data' => $products,
        ], 200);
    }
    public function showDetails($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $product,
        ], 200);
    }
    public function showCategory()
    {
        $categories = Category::all();
        if(!$categories)
        {
            return response()->json([
                'success' => false,
                'message' => 'Categories not found',
            ],404);
        }
        return response()->json([
            'success' => true,
            'data' => $categories,
        ],200);
    }
}
