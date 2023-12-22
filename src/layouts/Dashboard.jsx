import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaHome, FaUtensilSpoon } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosPublic from "../hooks/UseAxiosPublic";

const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const axiosPublic = UseAxiosPublic();

    const fetchUserData = async () => {
        try {
            if (!authContext.user) {
                console.error('User information is not available');
                return;
            }

            const userEmail = authContext.user.email;
            const response = await axiosPublic.get(`/users/${userEmail}`);
            const user = response.data;
            setUserData(user);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (authContext.user && authContext.user.email) {
            fetchUserData();
        }
    }, [authContext?.user, axiosPublic]);

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-64 lg:min-h-screen bg-blue-400 p-4">
                <ul className="menu">
                    <li>
                        <NavLink to="/">
                            <FaArrowLeft /> Go Back
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/DashBoard">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allTasks">
                            <FaUtensilSpoon /> All Tasks
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-4">
                {userData ? (
                    <div>
                        <h2 className="text-2xl lg:text-4xl  flex mx-auto justify-center text-center  mb-4">Welcome, {userData.name}!</h2>
                        <img
                            src={userData.imageUrl}
                            alt="User Profile"
                            className="w-80 flex mx-auto h-80 lg:w-50% justify-center text-center  lg:h-50% rounded-full mb-4"
                        />
                    </div>
                ) : (
                    <h2 className="text-2xl mb-4">Welcome!</h2>
                )}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
