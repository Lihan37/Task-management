import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";

const Registration = () => {
    const axiosPublic = UseAxiosPublic();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [image, setImage] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm();

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const watchPassword = watch("password", "");

    const onSubmit = async (data) => {
        console.log("Form data before registration:", data);
    
        try {
            // Create user with email and password
            const result = await createUser(data.email, data.password);
            console.log("User creation successful:", result);
    
            const loggedUser = result.user;
    
            if (image) {
                // Upload image to ImgBB
                const formData = new FormData();
                formData.append("image", image);
    
                const response = await axiosPublic.post(
                    `https://api.imgbb.com/1/upload?key=600d5036af985fdac53804b2e2c7d4fb`,
                    formData
                );
    
                console.log("Image upload successful:", response);
    
                const imageUrl = response.data.data.url;
    
                // Update user profile with name and image URL
                await updateUserProfile(data.name, imageUrl);
                console.log("User profile update successful");
    
                // Create user data for your server
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    imageUrl: imageUrl, // Include image URL in user data
                };
    
                // Post user data to your server
                const res = await axiosPublic.post("/users", userInfo);
    
                if (res.status === 201 && res.data.insertedId) {
                    // User creation on your server successful
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User has been created",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/dashboard");
                } else {
                    console.error("User not created:", res.data);
                }
            } else {
                console.log("No image selected");
            }
        } catch (error) {
            console.error("User creation failed:", error);
            // Check for password-related errors
            if (error.code === "auth/weak-password") {
                console.error("Weak password. Password should be stronger.");
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card shrink-0 lg:w-2/4 shadow-2xl justify-center bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" encType="multipart/form-data">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            name="name"
                            placeholder="Name"
                            className="input input-bordered"
                        />
                        {errors.name && <span>This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo Upload</span>
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="input"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            {...register("email", { required: true })}
                            placeholder="Email"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                            })}
                            placeholder="Password"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            {...register("confirmPassword", {
                                required: true,
                                validate: (value) => value === watchPassword || "Passwords do not match",
                            })}
                            placeholder="Confirm Password"
                            className="input input-bordered"
                            required
                        />
                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                <p className="px-6 mb-4">
                    <small>
                        Already have an account?{" "}
                        <Link to="/login">
                            <span className="font-bold text-blue-700">Login here</span>
                        </Link>
                    </small>
                </p>
            </div>
        </div>
    );
};

export default Registration;
