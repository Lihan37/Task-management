import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';

const SocialLogin = () => {
    const {signInWithGoogle} = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result =>{
            console.log(result);
            const userInfo = {
                email : result.user.email,
                name : result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        })
    }   

    return (
        <div>
            <div className='text-center'>
                <button onClick={handleGoogleSignIn} className='btn w-3/4 mb-4 bg-blue-600 text-white text-center'>
                    <FaGoogle></FaGoogle>Login with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;