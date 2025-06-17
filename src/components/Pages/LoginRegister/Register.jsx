import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Register = () => {

    const { createUser } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user
                console.log("User created successfully on", user)
                // .then(() => {
                // console.log("User profile updated successfully")
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    // photo: data.PhotoURL,
                    role: "member",
                    status: " "
                }
                console.log(userInfo)
                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        if (res.data.insertedId) {
                            // console.log("User added to the database")
                            toast.success("User registered successfully")
                            reset()
                            navigate('/login')
                        }
                    })
                // })
                // .catch((err) => {
                //     console.log(err.message)
                // })
            })
            .catch(err => {
                console.log("Error registering user: ", err.message)
                toast.error("Error registering user: ", err.message)
            })
    };
    return (
        <div>
            <div className="flex  lg:max-w-[80vw] mx-auto min-h-screen dark:bg-black text-white p-10">
                {/* Left Panel */}
                <div className="hidden bg-gradient-to-br from-purple-700 to-black p-12 lg:flex flex-col justify-center items-center rounded-l-xl lg:w-[30vw] xl:w-[35vw] ">
                    <h1 className="text-4xl font-bold mb-4">RoadMap App</h1>
                    <p className="text-2xl mb-6">Get Started with Us</p>
                    <p className="text-center mb-10">
                        Complete these easy steps to register your account.
                    </p>
                    <div className="flex flex-col gap-4">
                        <button className="bg-white text-black py-2 px-6 rounded-full">1. Sign up your account</button>
                        <button className="bg-gray-700 py-2 px-6 rounded-full">2. Set up your workspace</button>
                        <button className="bg-gray-700 py-2 px-6 rounded-full">3. Set up your profile</button>
                    </div>
                </div>


                {/* Right Panel */}
                <div className="flex-1 flex flex-col justify-center lg:px-16">
                    <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Register Account</h2>
                    <p className="mb-8 text-center text-black dark:text-white">Enter your personal data to create your account.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* First Name */}
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                            placeholder="Your Name"
                            required
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        {/* Photo URL */}
                        {/* <input
                            type='text'
                            {...register("PhotoURL", { required: "Photo is required" })}
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                            placeholder="Photo URL"
                        />
                        {errors.PhotoURL && <p className="text-red-500">{errors.PhotoURL.message}</p>} */}
                        {/* Email */}
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Email</label>
                        <input
                            type='email'
                            {...register("email",
                                {
                                    required: true,
                                    pattern: /^[a-z\d]+@[a-z\d]+\.[a-z]+$/,
                                })}
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                            placeholder="abc@gmail.com"
                        />
                        {errors.email?.type === 'required' && (<p className='text-red-700' role="alert">Email is required</p>)}
                        {errors.email?.type === 'pattern' && (<p className='text-red-700' role="alert">Cant use any uppercase word & have to use a @ between name and domain</p>)}
                        {/* Password */}
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Password</label>
                        <input type="password" placeholder="(Exm: abcd@1234)" {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
                        })} name='password' className=" w-full bg-gray-800 text-white py-2 px-4 rounded" required />

                        {errors.password?.type === "required" && (
                            <p className='text-red-700' role="alert">Password is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className='text-red-700' role="alert">Minimum 6 character required</p>
                        )}
                        {errors.password?.type === "pattern" && (
                            <p className='text-red-700' role="alert">Password must have one uppercase one lower case one special character one number</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-white text-black py-2 px-4 rounded mt-4 font-bold"
                        >
                            Register
                        </button>
                    </form>

                    <p className=" mt-4 text-center text-black dark:text-white">
                        Already have an account? <Link to={'/login'} className="text-green-600 font-semibold">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
