<?php

namespace App\Http\Controllers\Admin\AuthenAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class Authen extends Controller
{
    public function login(Request $request)
    {
        try {
            // Validate đầu vào
            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            // Tìm user theo email
            $user = User::where('email', $request->email)->first();

            // Kiểm tra user tồn tại và role
            if (!$user || $user->role != 1) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email không tồn tại hoặc không có quyền admin'
                ], 401);
            }

            // Kiểm tra số lần đăng nhập sai
            if ($user->login_attempts >= 5) {
                $lastAttempt = new Carbon($user->last_login_attempt);
                $now = Carbon::now();

                // Nếu chưa đủ 5 phút
                if ($lastAttempt->diffInMinutes($now) < 5) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Tài khoản đã bị khóa, vui lòng thử lại sau 5 phút'
                    ], 429);
                } else {
                    // Reset số lần đăng nhập sai
                    $user->login_attempts = 0;
                    $user->save();
                }
            }

            // Kiểm tra mật khẩu
            if (!Hash::check($request->password, $user->password)) {
                // Tăng số lần đăng nhập sai
                $user->login_attempts += 1;
                $user->last_login_attempt = Carbon::now();
                $user->save();

                return response()->json([
                    'status' => false,
                    'message' => 'Mật khẩu không đúng',
                    'attempts_remaining' => 5 - $user->login_attempts
                ], 401);
            }

            // Tạo token
            $token = $user->createToken('admin-token')->plainTextToken;

            // Reset số lần đăng nhập sai
            $user->login_attempts = 0;
            $user->last_login_attempt = null;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Đăng nhập thành công',
                'token' => $token,
                'user' => [
                    'id' => $user->id_user,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role
                ]
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
            // Xóa token hiện tại
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => true,
                'message' => 'Đăng xuất thành công'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function profile(Request $request)
    {
        try {
            return response()->json([
                'status' => true,
                'user' => $request->user()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
