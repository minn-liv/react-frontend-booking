import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./containers/booking/home-page/HomePage";
import Register from "./containers/booking/auth/Register";
import Login from "./containers/booking/auth/Login";
import NotFound from "./containers/error/NotFound";
import Booking from "./containers/booking/book-page/Booking";
import Profile from "./containers/booking/profile/Profile";
import Services from "./containers/booking/services/Services";
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
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
