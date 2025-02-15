import DefaultLayout from "@/layouts/DefaultLayout";
import HeaderLayout from "@/layouts/HeaderLayout";
import NoneLayout from "@/layouts/NoneLayout";
import NewPasswordPage from "@/pages/resetpassword";
import * as Component from "@/constants/lazyComponents";
import Test from "@/pages/test";
import ProductDetail from "@/pages/products-detail";
import UserDashboard from "@/pages/userDashboard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import FooterLayouts from "@/layouts/FooterLayouts";
import ForgotPasswordPage from "@/pages/forgotpassword";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";

const publicRoutes = [
  { path: "/", component: Component.HomePage, layout: DefaultLayout },
  { path: "/trang-chu", component: Component.HomePage, layout: DefaultLayout },
  {
    path: "/danh-muc",
    component: Component.ProductCategoryPage,
    layout: HeaderLayout,
  },
  { path: "/login", component: Component.LoginPage, layout: FooterLayouts },
  { path: "/register", component: Component.RegisterPage, layout: FooterLayouts },
  { path: "/forgot-password", component: ForgotPasswordPage, layout: FooterLayouts },
  {
    path: "/reset-password",
    component: NewPasswordPage,
    layout: FooterLayouts,
  },
  { path: "/gioi-thieu", component: Component.AboutPage, layout: HeaderLayout },
  { path: "/lien-he", component: Component.ContactPage, layout: HeaderLayout },
  {
    path: "/chi-tiet-san-pham",
    component: ProductDetail,
    layout: HeaderLayout,
  },
  { path: "/test", component: Test, layout: NoneLayout },
  {
    path: "/products/search",
    component: Component.SearchPages,
    layout: HeaderLayout,
  },
  {
    path: "/danh-muc/chitietsanpham",
    component: Component.ProductDetailPage,
    layout: HeaderLayout,
  },
  {
    path: "/user/:tab/:subTab",
    component: UserDashboard,
    layout: HeaderLayout,
  },
  {
    path: "/user/:tab",
    component: UserDashboard,
    layout: HeaderLayout,
  },
  {
    path: "/user",
    component: UserDashboard,
    layout: HeaderLayout,
  },
  {
    path: "/admin/login",
    component: AdminLoginPage,
    layout: FooterLayouts,
  },  



];

const privateRoutes = [
  {
    path: "/gio-hang",
    component: Component.ShoppingCartPage, 
    layout: HeaderLayout,
    roles: 0,
  },
  {
    path: "/check-out",
    component: Component.CheckoutPage, 
    layout: HeaderLayout,
    roles: 0,
  },
  {
    path: "/admin/:tab",
    component: AdminDashboard,
    layout: NoneLayout,
  },  
];

export { publicRoutes, privateRoutes };
