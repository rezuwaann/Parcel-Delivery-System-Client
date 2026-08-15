import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Login = () => {
    const { register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();

    const {
        signInWithGoogle,
        resetPassword,
        signInUser
    } = useAuth()


    const navigate = useNavigate()
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    console.log(location)

    const forgetPassword = () => {

        const email = getValues('email')
        console.log(email)

        resetPassword(email)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(res => {
                console.log(res)
                navigate(location?.state || '/')
            })
            .then(error => console.log(error))
    }


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result)


                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL


                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)
                    })

                navigate(location.state || '/')
            })
            .then(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset flex flex-col gap-3">
                    <h1 className='text-5xl font-bold'>Welcome Back</h1>
                    <h2 className='text-xl '>Login With DeliveryX</h2>

                    <label className="label text-lg">Email</label>
                    <input name='email' type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === "required" && (
                        <p className='text-red-500 font-bold'>First name is required</p>
                    )}

                    <label className="label text-lg">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/
                    })} className="input" placeholder="Password" />

                    {errors.password?.type === 'required' && <p className='text-red-500 font-bold'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500 font-bold'>Pasword must be minimum 6 characters long</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-500 font-bold'>Password must contains at least one uppercase letter, one lowercase letter, and one special character</p>}

                    <div onClick={forgetPassword}><a className="link link-hover text-lg underline">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4 ">Login</button>

                    <p className='text-lg'>Don't have an account? <span className='text-red-500 underline'><NavLink state={location.state} to={'/register'}>Register</NavLink></span></p>



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

export default Login;