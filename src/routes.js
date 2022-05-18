import Admin from "./pages/Admin";
import {
    ADMIN_DASHBOARD_ROUTE,
    ADMIN_ROUTE,
    CART_ROUTE,
    CATALOG_ROUTE, CHECKOUT_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PRODUCT_ROUTE, PROFILE_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart/Cart";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: PROFILE_ROUTE,
        Component: <ProfilePage/>
    },
    {
        path: ADMIN_DASHBOARD_ROUTE,
        Component: <AdminDashBoard/>
    }
]

export const publicRoutes = [
    {
        path: PRODUCT_ROUTE + '/:slug',
        Component: <ProductPage/>
    },
    {
        path: CATALOG_ROUTE + '/:slug',
        Component: <Catalog/>
    },
    {
        path: CART_ROUTE,
        Component: <Cart/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>
    },
    {
        path: HOME_ROUTE,
        Component: <Home/>
    },
    {
        path: CHECKOUT_ROUTE,
        Component: <CheckoutPage/>
    }

]