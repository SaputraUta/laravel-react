import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/signup",
        element: <SignUp/>,
    },
    {
        path: "/users",
        element: <Users/>,
    },
    {
        path: "*",
        element: <NotFound/>,
    },
]);

export default router;
