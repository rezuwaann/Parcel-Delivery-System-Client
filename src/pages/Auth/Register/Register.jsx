import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth';
import { NavLink, useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const Register = () => {
    const { register,
        handleSubmit,

        formState: { errors }
    } = useForm();

    const { registerUser,
        signInWithGoogle,
        updateUserProfile } = useAuth();


    const navigate = useNavigate();
    const location = useLocation();

    console.log(location);

    const handleRegistration = (data) => {
        console.log(data)
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)

                const formData = new FormData()
                formData.append('image', profileImg)

                const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
                axios.post(image_api_url, formData)
                    .then(res => {
                        console.log('aftre image upload', res.data.data.url)


                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile update done')
                            })
                    })



                    .catch(error => console.log(error))
                navigate(location.state || '/')
            })
            .then(error => console.log(error))
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result)
                navigate(location.state || '/')
            })
            .then(error => {
                console.log(error)
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset gap-3">
                    <h1 className='text-5xl font-bold'>Create an Account</h1>
                    <h2 className='text-xl '>Register With ZapShift</h2>


                    {/* name */}
                    <label className="label text-lg">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Enter your name" />
                    {errors.name?.type === "required" && (
                        <p className='text-red-500 font-bold'>First name is required</p>
                    )}

                    {/* name */}
                    <label className="label text-lg">Photo URL</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Enter your name" />
                    {errors.name?.type === "required" && (
                        <p className='text-red-500 font-bold'>First name is required</p>
                    )}

                    {/* email */}
                    <label className="label text-lg">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Enter your email" />
                    {errors.email?.type === "required" && (
                        <p className='text-red-500 font-bold'>Email is required</p>
                    )}


                    {/* pass */}
                    <label className="label text-lg">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/
                    })} className="input" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-500 font-bold'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500 font-bold'>Pasword must be minimum 6 characters long</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-500 font-bold'>Password must contains at least one uppercase letter, one lowercase letter, and one special character</p>}
                    <div><a className="link link-hover text-lg underline">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>

                    <p className='text-lg' >Already have an account? <span className='text-red-500 underline'><NavLink state={location.state} to={'/login'}>Login</NavLink></span></p>


                </fieldset>

            </form>

            <p className='text-center text-lg text-gray-600 font-semibold'>OR</p>
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default Register;