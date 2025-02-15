import { ErrorNotification } from "@/components/notifications";
import { DataContext } from "@/constants/DataProvider";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Giả sử token lưu trong localStorage, bạn có thể thay đổi cách lấy role tuỳ theo ứng dụng của bạn.


const PrivateRoute = ({ element }) => {
    const { token, userDetail } = useContext(DataContext)
    const [checkLogin, setCheckLogin] = useState(false);

    useEffect(() => {
        if(!token) {    
            setCheckLogin(true);
            return; 
        }
    }, [token])
    
    console.log(token)

  if (checkLogin) {
    return <Navigate to={'/login'} replace />
  }
  return element;
};

export default PrivateRoute;
