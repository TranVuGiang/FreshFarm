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
}
