import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../MainLayout/Main";
import Register from "../components/Pages/LoginRegister/Register";
import Login from "../components/Pages/LoginRegister/Login";
import Home from "../Layouts/Home";
import CreatePostPage from "../components/Pages/HomePages/PostFrom";


export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            // {
            //     path: "/createPostPage",
            //     element: <CreatePostPage />
            // },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
        ]
    }
])