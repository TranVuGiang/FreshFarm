<!DOCTYPE html>
<html>
<head>
    <title>Xác nhận email</title>
</head>
<body>
    <h2>Xin chào {{ $user->name }}</h2>
    <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng click vào link bên dưới để xác nhận email của bạn:</p>

    <a href="{{ url('verify-email/' . $token) }}">Xác nhận email</a>

    <p>Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.</p>
</body>
</html>
