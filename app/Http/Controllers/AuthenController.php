<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
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
                'email' => 'nullable|string|email|max:255|unique:users,email,' . auth()->id() . ',id_user',
            ]);

            $user = auth()->user();

            $user->update([
                'name' => $request->name ?? $user->name,
                'email' => $request->email ?? $user->email
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


    public function updateAddressShipping(Request $request)
    {
        try {
            $request->validate([
                'phone' => 'required|string|max:20|regex:/^([0-9\s\-\+\(\)]*)$/',
                'address' => 'required|string|max:255|min:5',
                'is_default' => 'boolean|nullable'
            ]);

            $user = auth()->user();

            // Kiểm tra giới hạn số lượng địa chỉ (ví dụ max 5 địa chỉ)
            if ($user->shippingAddresses()->count() >= 5) {
                return response()->json([
                    'status' => false,
                    'message' => 'Đã đạt giới hạn số lượng địa chỉ'
                ], 400);
            }

            DB::beginTransaction();
            try {
                // Nếu là địa chỉ đầu tiên, set mặc định là true
                $isFirst = $user->shippingAddresses()->count() === 0;
                $isDefault = $isFirst ? true : ($request->is_default ?? false);

                // Nếu đánh dấu là địa chỉ mặc định, update các địa chỉ khác
                if ($isDefault) {
                    $user->shippingAddresses()
                        ->where('is_default', true)
                        ->update(['is_default' => false]);
                }

                // Tạo địa chỉ giao hàng mới
                $shippingAddress = $user->shippingAddresses()->create([
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'is_default' => $isDefault
                ]);

                DB::commit();

                return response()->json([
                    'status' => true,
                    'message' => 'Thêm địa chỉ giao hàng thành công',
                    'shipping_address' => $shippingAddress
                ]);

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

        } catch(\Exception $e) {
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

    public function changePassword(Request $request)
    {
        try {
            $request->validate([
                'current_password' => 'required|string',
                'new_password' => 'required|string|min:8|different:current_password',
                'confirm_password' => 'required|string|same:new_password'
            ]);

            $user = auth()->user();

            // Kiểm tra mật khẩu hiện tại
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Mật khẩu hiện tại không đúng'
                ], 401);
            }

            // Cập nhật mật khẩu mới
            $user->password = Hash::make($request->new_password);
            $user->save();

            // Đăng xuất khỏi các thiết bị khác
            $user->tokens()->delete();

            // Tạo token mới
            $token = $user->createToken('customer_token')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Đổi mật khẩu thành công',
                'token' => $token
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function forgotPassword(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|exists:users,email'
            ]);

            $user = User::where('email', $request->email)
                       ->where('role', 0) // Chỉ cho phép khách hàng
                       ->first();

            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email không tồn tại trong hệ thống'
                ], 404);
            }

            // Tạo token reset password
            $token = Str::random(64);

            // Lưu thông tin reset password
            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $request->email],
                [
                    'token' => Hash::make($token),
                    'created_at' => Carbon::now()
                ]
            );

            // Gửi email
            $resetLink = env('FRONTEND_URL') . '/reset-password?token=' . $token . '&email=' . $request->email;

            Mail::send('emails.forgot-password', ['resetLink' => $resetLink], function($message) use ($request) {
                $message->to($request->email);
                $message->subject('Đặt lại mật khẩu');
            });

            return response()->json([
                'status' => true,
                'message' => 'Đã gửi link đặt lại mật khẩu vào email của bạn'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required|string',
                'email' => 'required|email|exists:users,email',
                'password' => 'required|string|min:8',
                'confirm_password' => 'required|string|same:password'
            ]);

            // Kiểm tra token và email
            $resetRecord = DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->first();

            if (!$resetRecord || !Hash::check($request->token, $resetRecord->token)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Token không hợp lệ hoặc đã hết hạn'
                ], 400);
            }

            // Kiểm tra thời gian token (ví dụ: hết hạn sau 60 phút)
            if (Carbon::parse($resetRecord->created_at)->addMinutes(60)->isPast()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Token đã hết hạn'
                ], 400);
            }

            // Cập nhật mật khẩu
            $user = User::where('email', $request->email)->first();
            $user->password = Hash::make($request->password);
            $user->save();

            // Xóa token đã sử dụng
            DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->delete();

            return response()->json([
                'status' => true,
                'message' => 'Đặt lại mật khẩu thành công'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
