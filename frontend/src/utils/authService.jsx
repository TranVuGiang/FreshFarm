import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const api_LoadProducts = async () => {
  const resp = await axios.get(`${API_URL}/api/showProduct`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp.data;
};

export const api_LoadCategories = async () => {
  const resp = await axios.get(`${API_URL}/api/category`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp.data;
};

export const api_SignUp = async ({ name, email, password }) => {
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
};
export const api_LogIn = async ({ email, password }) => {
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
};
export const api_SearchProducts = async ({ name }) => {
  const resp = await axios.get(
    `${API_URL}/api/searchProducts?name=${name}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return resp.data;
};
export const api_GetUserDetails = async (token) => {
    const resp = await fetch(`${API_URL}/api/user`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    return await resp.json();
}
export const api_ShowProductDetail = async (product_id) => {
  const resp = await axios.get(`${API_URL}/api/products/${product_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp.data;
}