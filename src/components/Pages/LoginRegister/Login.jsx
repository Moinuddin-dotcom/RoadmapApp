import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const roleCredentials = {
        admin: { email: 'admin@gmail.com', password: 'Admin@12' },
        member: { email: 'tasif@gmail.com', password: 'Tasif@12' },
    };
    const handleRole = (role) => {
        setEmail(roleCredentials[role].email)
        setPassword(roleCredentials[role].password)

        setValue('email', roleCredentials[role].email)
        setValue('password', roleCredentials[role].password)
    }

    const onSubmit = (data) => {
        console.log(data);
        signIn(data.email, data.password)
            .then(res => {
                const user = res.user
                toast.success("User log in successfully", user)
                // setLoading(true)
                navigate('/')
            })
            .catch(err => {
                toast.error("Error logged in user: ", err.message)
            })


    };
    return (
        <div className='bg-black'>
            <div className="flex lg:max-w-[80vw] mx-auto min-h-screen dark:bg-black text-white p-5 md:p-10">

                {/* Left Panel */}
                <div className="flex-1 flex flex-col justify-center lg:px-16">
                    <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Log In Account</h2>
                    <p className="mb-8 text-center text-black dark:text-white">Enter your email & password.</p>

                    <div className=' my-2 text-center '>
                        <h1 className='text-black dark:text-white pb-2'>Role wise Email & Password</h1>
                        <div className='flex flex-col md:flex-row justify-center gap-4 border-t border-white'>

                            <button onClick={() => handleRole('admin')} className='bg-white text-black py-2 w-[50%] rounded mt-4 font-bold cursor-pointer' >Admin</button>
                            <button onClick={() => handleRole('member')} className='bg-white text-black py-2 w-[50%] rounded mt-4 font-bold cursor-pointer' >Member</button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Email</label>
                        <input
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            {...register("email", { required: "Email is required" })}
                            defaultValue={email}
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                            placeholder="abc@gmail.com"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        {/* Password */}
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Password</label>
                        <input
                            defaultValue={password}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Must be at least 6 characters" },
                            })}
                            type="password"
                            //   defaultValue={password}
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                        <button
                            type="submit"
                            className="w-full bg-white text-black py-2 px-4 rounded mt-4 font-bold"
                        >
                            Log in
                        </button>
                    </form>

                    <p className="mt-4 text-center text-black dark:text-white">
                        Create an account? <Link to={'/register'} className="text-green-600 font-semibold">Register</Link>
                    </p>
                </div>
                {/* Right Panel */}
                <div className="hidden bg-gradient-to-br from-purple-700 to-black p-12 lg:flex flex-col justify-center items-center rounded-r-xl lg:w-[30vw] xl:w-[35vw]">
                    <h1 className="text-4xl font-bold mb-4">Hello, <br /> Welcome Back</h1>
                    <p className="text-2xl mb-6"></p>
                    <p className="text-center mb-10">
                        Complete these easy steps to login your account.
                    </p>
                    <div className="flex flex-col gap-4">
                        <button className="bg-white text-black py-2 px-6 rounded-full">1. Give your registered email</button>
                        <button className="bg-gray-700 py-2 px-6 rounded-full">2. Give your registered email passord</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
