<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class AuthenController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'nullable|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 0, // Role mặc định cho khách hàng
                'status' => 1, // Status mặc định là active
                'login_attempts' => 0,
            ]);

            $token = $user->createToken('customer_token')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Đăng ký thành công',
                'user' => $user,
                'token' => $token,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            // Tìm user theo email
            $user = User::where('email', $request->email)->first();

            // Kiểm tra user tồn tại và role
            if (!$user || $user->role != 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Thông tin đăng nhập không hợp lệ'
                ], 401);
            }

            // Kiểm tra tài khoản có bị khóa không
            if ($user->status == 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Tài khoản đã bị khóa'
                ], 401);
            }

            // Kiểm tra số lần đăng nhập sai
            if ($user->login_attempts >= 5) {
                $lastAttempt = new Carbon($user->last_login_attempt);
                $now = Carbon::now();

                if ($lastAttempt->diffInMinutes($now) < 5) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Tài khoản tạm thời bị khóa, vui lòng thử lại sau 5 phút'
                    ], 429);
                } else {
                    $user->login_attempts = 0;
                    $user->save();
                }
            }

            // Kiểm tra mật khẩu
            if (!Hash::check($request->password, $user->password)) {
                $user->login_attempts += 1;
                $user->last_login_attempt = Carbon::now();
                $user->save();

                return response()->json([
                    'status' => false,
                    'message' => 'Mật khẩu không đúng',
                    'attempts_remaining' => 5 - $user->login_attempts
                ], 401);
            }

            // Đăng nhập thành công
            $token = $user->createToken('customer_token')->plainTextToken;

            // Reset login attempts
            $user->login_attempts = 0;
            $user->last_login_attempt = null;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Đăng nhập thành công',
                'user' => $user,
                'token' => $token,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => true,
                'message' => 'Đăng xuất thành công',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getCurrentUser(Request $request)
    {
        try {
            return response()->json([
                'status' => true,
                'message' => 'Lấy thông tin thành công',
                'user' => $request->user()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateUser(Request $request)
    {
        try {
            $request->validate([
                'name' => 'nullable|string|max:255',
                'firstname' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:255',
            ]);

            $user = auth()->user();

            $user->update([
                'name' => $request->name ?? $user->name,
                'firstname' => $request->firstname ?? $user->firstname,
                'phone' => $request->phone ?? $user->phone,
                'address' => $request->address ?? $user->address,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Cập nhật thông tin thành công',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (auth()->check()) {
                $user = auth()->user();

                // Kiểm tra role
                if ($user->role != 0) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Không có quyền truy cập'
                    ], 403);
                }

                // Kiểm tra token hết hạn
                $token = $request->user()->currentAccessToken();
                if ($token && $token->expires_at && $token->expires_at->isPast()) {
                    $token->delete();
                    return response()->json([
                        'status' => false,
                        'message' => 'Token đã hết hạn, vui lòng đăng nhập lại',
                    ], 401);
                }

                // Kiểm tra status
                if ($user->status == 0) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Tài khoản đã bị khóa'
                    ], 401);
                }
            }
            return $next($request);
        })->except(['login', 'register']);
    }
}
