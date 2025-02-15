import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// ==================================================
// 1. API liên quan đến sản phẩm
// ==================================================

// Lấy danh sách sản phẩm
export const api_LoadProducts = async () => {
  try {
    const resp = await axios.get(`${API_URL}/api/showProduct`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
};

// Lấy chi tiết sản phẩm theo ID
export const api_ShowProductDetail = async (product_id) => {
  try {
    const resp = await axios.get(`${API_URL}/api/products/${product_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
};

// Tìm kiếm sản phẩm theo tên
export const api_SearchProducts = async ({ name }) => {
  try {
    const resp = await axios.get(`${API_URL}/api/searchProducts?name=${name}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
};

// ==================================================
// 2. API liên quan đến danh mục
// ==================================================

// Lấy danh sách danh mục sản phẩm
export const api_LoadCategories = async () => {
  try {
    const resp = await axios.get(`${API_URL}/api/category`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
};

// ==================================================
// 3. API liên quan đến người dùng
//    (Đăng ký, Đăng nhập, Quên/Reset mật khẩu, Thông tin người dùng)
// ==================================================

// Đăng ký tài khoản
export const api_SignUp = async ({ name, email, password }) => {
  try {
    const resp = await axios.post(
      `${API_URL}/api/auth/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
};

// Đăng nhập
export const api_LogIn = async ({ email, password }) => {
  try {
    const resp = await axios.post(
      `${API_URL}/api/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
};

// Quên mật khẩu
export const api_ForgotPassword = async ({ email }) => {
  try {
    const resp = await axios.post(
      `${API_URL}/api/forgot-password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
};

// Reset mật khẩu
export const api_ResetPassword = async ({
  token,
  email,
  password,
  confirm_password,
}) => {
  try {
    const resp = await axios.post(
      `${API_URL}/api/reset-password`,
      { token, email, password, confirm_password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
};

// Lấy thông tin người dùng
export const api_GetUserDetails = async (token) => {
  try {
    const resp = await fetch(`${API_URL}/api/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return await resp.json();
  } catch (error) {
    return error.response.data;
  }
};

// Cập nhật thông tin người dùng
export const api_UpdateUserInfo = async (token, data) => {
  try {
    const resp = await axios.put(`${API_URL}/api/user/update`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
};

// ==================================================
// 4. API liên quan đến giỏ hàng
// ==================================================

// Hiển thị giỏ hàng
export const api_ShowShoppingCart = async (token) => {
  try {
    const resp = await axios.get(`${API_URL}/api/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
};

// Thêm sản phẩm vào giỏ hàng
export const api_AddShoppingCart = async (token, id_product, quantity) => {
  try {
    const resp = await axios.post(
      `${API_URL}/api/cart/add`,
      { id_product, quantity },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const api_DeleteShoppingCart = async (token, id_cart_detail) => {
  try {
    const resp = await axios.delete(
      `${API_URL}/api/cart/detail/${id_cart_detail}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
};

// Thanh toán
export const api_Checkout = async (token) => {
  try {
    const resp = await axios.post(
      `${API_URL}/api/checkout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};

// ==================================================
// 5. API liên quan đến đơn hàng
// ==================================================

// Lấy danh sách đơn hàng của người dùng
export const api_GetMyOrders = async (token) => {
  try {
    const resp = await axios.get(`${API_URL}/api/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};

// Lấy chi tiết đơn hàng theo ID
export const api_GetOrderDetails = async (token, id_bill) => {
  try {
    const resp = await axios.get(`${API_URL}/api/order/${id_bill}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};

// =====================================================
// 6. API Admin
// ( Login, SignUp, ForgotPassword, ResetPassword, ChangePassword )
// =====================================================

// Đăng nhập admin
export const api_AdminLogIn = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};
