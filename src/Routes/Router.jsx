import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Home/Home";
import Registration from "../SignUp/Registration/Registration";
import Login from "../SignUp/Login/Login";
import DashBoard from "../DashBoard/DashBoard";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'registration',
          element: <Registration></Registration>
        },
        {
          path: 'login',
          element: <Login></Login>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <DashBoard></DashBoard>
    }
  ]);