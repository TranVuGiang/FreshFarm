import { api_GetUserDetails } from "@/utils/authService";
import { createContext, useCallback, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return (
      localStorage.getItem("token") || sessionStorage.getItem("token") || ""
    );
  });
  const [userDetail, setUserDetail] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartUpdate, setCartUpdate] = useState(0);



  const triggerCartUpdate = useCallback(() => { 
    setCartUpdate((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!token) return;

    const loadUserDetail = async () => {
      try {
        const resp = await api_GetUserDetails(token);
        setUserDetail(resp.user);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        setUserDetail(null);
      }
    };

    loadUserDetail();
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        token,
        setToken,
        userDetail,
        cartCount,
        setCartCount,
        cartUpdate,
        setCartUpdate,
        triggerCartUpdate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
