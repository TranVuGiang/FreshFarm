import {
  Bell,
  CreditCard,
  FolderTree,
  Heart,
  Home,
  ListTree,
  Lock,
  MapPin,
  Package,
  Settings,
  ShoppingCart,
  User,
  User2Icon,
  UserPlus,
  Users,
} from "lucide-react";

export const menuItemsUserDashboard = [
  { icon: Bell, label: "Thông báo", value: "notifications" },
  {
    icon: User,
    label: "Tài khoản",
    value: "account",
    subMenu: [
      { icon: User2Icon, label: "Thông tin", value: "user-profile" },
      { icon: Lock, label: "Đổi mật khẩu", value: "change-password" },
      { icon: MapPin, label: "Địa chỉ giao hàng", value: "shipping-address" },
    ],
  },
  { icon: Package, label: "Đơn hàng", value: "purchase" },
  { icon: Heart, label: "Yêu thích", value: "favorites" },
  { icon: ShoppingCart, label: "Giỏ hàng", value: "cart" },
];

export const navLists = [
  { label: "Trang chủ", path: "/" },
  { label: "Danh mục", path: "/danh-muc" },
  { label: "Khuyến mãi", path: "/khuyen-mai" },
  { label: "Giới thiệu", path: "/gioi-thieu" },
  { label: "Liên hệ", path: "/lien-he" },
];

export const footerLists = [
  { label: "Danh mục", path: "/danh-muc" },
  { label: "Khuyến mãi", path: "/khuyen-mai" },
  { label: "Giới thiệu", path: "/gioi-thieu" },
  { label: "Liên hệ", path: "/lien-he" },
];

export const menuItemsAdminDashboard = [
  {
    title: "Trang chủ",
    icon: Home,
    path: "dashboard",
  },
  {
    title: "Quản lý",
    icon: FolderTree,
    submenu: [
      { title: "Đơn hàng", icon: ShoppingCart, path: "orders" },
      { title: "Danh mục", icon: ListTree, path: "categories" },
      { title: "Sản phẩm", icon: Package, path: "products" },
      { title: "Khách hàng", icon: Users, path: "customers" },
      { title: "Thanh toán", icon: CreditCard, path: "payments" },
    ],
  },
  {
    title: "Nhân viên",
    icon: UserPlus,
    path: "employees",
  },
  {
    title: "Cài đặt hệ thống",
    icon: Settings,
    path: "settings",
  },
];
