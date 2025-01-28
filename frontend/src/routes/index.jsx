import DefaultLayout from "@/layouts/DefaultLayout"
import HeaderLayout from "@/layouts/HeaderLayout"
import NoneLayout from "@/layouts/NoneLayout"
import NewPasswordPage from "@/pages/resetpassword"
import * as Component from "@/constants/lazyComponents"
import Test from "@/pages/test"


const publicRoutes = [ 
    {path: '/', component: Component.HomePage , layout: DefaultLayout},
    {path: '/trangchu', component: Component.HomePage, layout: DefaultLayout},
    {path: '/danhmuc', component: Component.ProductCategoryPage, layout: HeaderLayout},
    {path: '/resetpassword', component: NewPasswordPage, layout: NoneLayout},
    {path: '/gioithieu', component: Component.AboutPage, layout: HeaderLayout},
    {path: '/lienhe', component: Component.ContactPage, layout: HeaderLayout},
    {path: '/test', component: Test, layout: NoneLayout},

]

const privateRoutes = [
    
]

export {publicRoutes, privateRoutes}