import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../MainLayout/Main";
import Register from "../components/Pages/LoginRegister/Register";
import Login from "../components/Pages/LoginRegister/Login";
import Home from "../Layouts/Home";
import CreatePostPage from "../components/Pages/HomePages/PostFrom";
import Modal from "../components/Pages/PostUpdateModal/Modal";
import SinglePostPage from "../components/Pages/HomePages/SinglePostPage";


export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/post/single-post/:id",
                element: <Modal />
            },
            {
                path: "/post/single-post-page/:id",
                element: <SinglePostPage />
            },
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