import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./containers/booking/home-page/HomePage";
import Register from "./containers/booking/auth/Register";
import Login from "./containers/booking/auth/Login";
import NotFound from "./containers/error/NotFound";
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
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
