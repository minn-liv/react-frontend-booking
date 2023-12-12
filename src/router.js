import { createBrowserRouter } from "react-router-dom";
import HomePage from "./containers/booking/home-page/HomePage";
import Register from "./containers/booking/auth/Register";
import Login from "./containers/booking/auth/Login";
import NotFound from "./containers/error/NotFound";
import Booking from "./containers/booking/book-page/Booking";
import Profile from "./containers/booking/profile/Profile";
import Services from "./containers/booking/services/Services";
import Blog from "./containers/booking/blog/Blog";
import SinglePost from "./containers/booking/blog/SinglePost";
import HomePageShop from "./containers/shop/home-page/HomePageShop";
import CategoryShop from "./containers/shop/category/CategoryShop";
import Cart from "./containers/shop/cart/Cart";
import Product from "./containers/shop/product/Product";
import About from "./containers/booking/about/About";
import Category8 from "./containers/shop/category/Category8";
import CategoryTopSell from "./containers/shop/category/CategoryTopSell";
import Location from "./containers/booking/location/Location";
import Category4 from "./containers/shop/category/Category4";
import Category5 from "./containers/shop/category/Category5";
import CartFalse from "./containers/shop/cart/CartFalse";
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/dang-ky",
        element: <Register />,
    },
    {
        path: "/dang-nhap",
        element: <Login />,
    },
    {
        path: "/dat-lich",
        element: <Booking />,
    },
    {
        path: "/dich-vu",
        element: <Services />,
    },
    {
        path: "/blog",
        element: <Blog />,
    },
    {
        path: "/dia-chi",
        element: <Location />,
    },
    {
        path: "/bai-viet/:blogPostId",
        element: <SinglePost />,
    },
    {
        path: "/cua-hang",
        element: <HomePageShop />,
    },
    {
        path: "/danh-muc",
        element: <CategoryShop />,
    },
    {
        path: "/danh-muc/tao-mau-cho-toc",
        element: <Category8 />,
    },
    {
        path: "/danh-muc/cham-soc-da-mat",
        element: <Category4 />,
    },
    {
        path: "/danh-muc/cham-soc-toc",
        element: <Category5 />,
    },
    {
        path: "/danh-muc/san-pham-ban-chay",
        element: <CategoryTopSell />,
    },
    {
        path: "/gio-hang/:cartId",
        element: <Cart />,
    },
    {
        path: "/gio-hang-false",
        element: <CartFalse />,
    },
    {
        path: "/san-pham/:productId",
        element: <Product />,
    },
    {
        path: "/trang-ca-nhan/:id",
        element: <Profile />,
    },
    {
        path: "/ve-chung-toi",
        element: <About />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
