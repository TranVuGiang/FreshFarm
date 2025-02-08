import DefaultLayout from "@/layouts/DefaultLayout"
import HeaderLayout from "@/layouts/HeaderLayout"
import NoneLayout from "@/layouts/NoneLayout"
import NewPasswordPage from "@/pages/resetpassword"
import * as Component from "@/constants/lazyComponents"
import Test from "@/pages/test"
import ProductDetail from "@/pages/products-detail"


const publicRoutes = [ 
    {path: '/', component: Component.HomePage , layout: DefaultLayout},
    {path: '/trang-chu', component: Component.HomePage, layout: DefaultLayout},
    {path: '/danh-muc', component: Component.ProductCategoryPage, layout: HeaderLayout},
    {path: '/doi-mat-khau-moi', component: NewPasswordPage, layout: NoneLayout},
    {path: '/gioi-thieu', component: Component.AboutPage, layout: HeaderLayout},
    {path: '/lien-he', component: Component.ContactPage, layout: HeaderLayout},
    {path: '/chi-tiet-san-pham', component: ProductDetail, layout: HeaderLayout},
    {path: '/test', component: Test, layout: NoneLayout},
    {path: '/products/search', component: Component.SearchPages, layout: HeaderLayout},
    {path: '/danh-muc/chitietsanpham', component: Component.ProductDetailPage, layout: HeaderLayout},

]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}