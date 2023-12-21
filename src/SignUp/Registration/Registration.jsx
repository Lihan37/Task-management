import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";


const Registration = () => {

    const axiosPublic = UseAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUSer = result.user;
                console.log(loggedUSer);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile info updated');
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('useradded db');
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your work has been saved",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                    })
                    .catch(error => console.log(error))
            })
    };


    return (
        <>

            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="card shrink-0 lg:w-2/4 shadow-2xl justify-center bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"
                                {...register("name", { required: true })}
                                name="name"
                                placeholder="Name" className="input input-bordered"

                                {...errors.name && <span>This field is required</span>}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input type="text"
                                {...register("photoURL", { required: true })}

                                placeholder="Photo" className="input input-bordered"

                                {...errors.photoURL && <span>This field is required</span>}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                name="email"
                                {...register("email", { required: true })}
                                placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"
                                name="password"
                                {...register("password", { required: true }, { required: true, minLength: 6, maxLength: 20 },
                                    { pattern: /^[A-Za-z]+$/i })}
                                placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <p className="px-6 mb-4"><small>Already have an account? <Link to="/login"><span className="font-bold text-blue-700">Login here</span></Link></small></p>
                </div>
            </div>

        </>
    );
};

export default Registration;