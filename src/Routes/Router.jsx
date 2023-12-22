import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Home/Home";
import Registration from "../SignUp/Registration/Registration";
import Login from "../SignUp/Login/Login";
import Dashboard from "../layouts/DashBoard";
import DashBoard from "../DashBoard/DashBoard";
import PrivateRoute from "./PrivateRoute";
import AllTasks from "../Users/Alltasks";
import EditTask from "../DashBoard/EditTask";
import Blog from "../Blogs/Blog";

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
      },
      {
        path: 'blog',
        element: <Blog></Blog>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'DashBoard',
        element: <DashBoard></DashBoard>
      },
      {
        path: 'allTasks',
        element: <AllTasks></AllTasks>
      },
      {
        path: 'edit-task/:taskId', 
        element: <EditTask />
      }
    ]
  }
]);
