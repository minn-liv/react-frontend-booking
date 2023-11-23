import { Navigate, createBrowserRouter } from "react-router-dom";
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
import MainShop from "./containers/shop/main-shop/MainShop";
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/booking",
        element: <Booking />,
    },
    {
        path: "/services",
        element: <Services />,
    },
    {
        path: "/blog",
        element: <Blog />,
    },
    {
        path: "/post",
        element: <SinglePost />,
    },
    {
        path: "/shop",
        element: <HomePageShop />,
    },
    {
        path: "/category",
        element: <CategoryShop />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
    {
        path: "/product/:productId", 
        element: <Product />,
    },
    {
        path: "/profile/:id",
        element: <Profile />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
