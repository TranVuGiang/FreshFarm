<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenController extends Controller
{
    //
    public function register(Request $request)
    {
        $request->validate([
                'name' => 'nullable|string|max:255',
                'firstname' => 'nullable|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'phone' => 'nullable|string|max:255',
                'address' => 'nullable|string|max:255',
                'role' => 'nullable|integer',
        ]);
        $user = User::create([
            'name' => $request->name,
            'firstname' => $request->firstname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => 0,
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message'=>'Register successfull',
            'user'=>$user,
            'token'=>$token,
        ],201);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);
        if(!Auth::attempt($request->only('email', 'password')))
        {
            throw ValidationException::withMessages([
                'email'=>["Thông tin đăng nhập không hợp lệ"],
            ]);
        }
        $user =  Auth::user();
        $token =  $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message'=>'Login successfull',
            'user'=>$user,
            'token'=>$token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Đăng xuất thành công',
        ]);
    }
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (auth()->check()) {
                $token = $request->user()->currentAccessToken();

                // Kiểm tra nếu token đã hết hạn
                if ($token && $token->expires_at && $token->expires_at->isPast()) {
                    $token->delete();
                    return response()->json([
                        'message' => 'Token đã hết hạn, vui lòng đăng nhập lại',
                    ], 401);
                }
            }
            return $next($request);
        })->except(['login', 'register']);
    }

    public function getCurrentUser(Request $request)
    {
        return response()->json([
            'message' => 'Lấy thông tin thành công',
            'user' => $request->user()
        ]);
    }
    public function updateUser(Request $request)
{
    $request->validate([
        'name' => 'nullable|string|max:255',
        'phone' => 'nullable|string|max:255',
        'address' => 'nullable|string|max:255',
    ]);

    $user = auth()->user();
    $user->update([
        'name' => $request->name,
        'phone' => $request->phone,
        'address' => $request->address,
    ]);

    return response()->json([
        'message' => 'Cập nhật thông tin thành công',
        'user' => $user,
    ]);
}


}
