import React from 'react'
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import Loading from '../../Loading/Loading';

const EditPost = ({ postData, onSuccess, isLoading }) => {
    const axiosPublic = useAxiosPublic();
    const { title, details, name, category } = postData;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log("From edited", data);
        const updateInfo = {
            title: data.title,
            details: data.details,
            category: data.category,
        }
        const { data: single } = await axiosPublic.patch(`/post/update-single-post/${postData._id}`, updateInfo)
        console.log(single);
        if (single.modifiedCount > 0) {
            reset(single);
            toast.success("Post updated successfully");
            // navigate('/')
            onSuccess();
        } else {
            toast.error("No changes made to the post");
        }
    }

    if (isLoading) return <Loading />


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-100 ">Author*</label>
                <input
                    type="text"
                    defaultValue={name}
                    {...register('name')}
                    className="w-full bg-gray-50 text-black py-2 px-4 rounded"
                    readOnly
                />
                {/* {errors.name && <p className="text-red-500">{errors.name.message}</p>} */}
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-100 ">Title *</label>
                <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full bg-gray-50 text-black py-2 px-4 rounded"
                    placeholder="Short, Descriptive title"
                    defaultValue={title}
                    required
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-100 ">Choose a category:</label>
                <select {...register("category", { required: true })} defaultValue={category} id="category" className="w-full bg-gray-50 text-black py-2 px-4 rounded">
                    <option value="" >Select one</option>
                    <option value="TO DO">TO DO</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>



                <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-100 ">Details</label>
                <textarea
                    {...register('details', { maxLength: { value: 300, message: "Details cannot exceed 300 characters", } })}

                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-black rounded-md"
                    placeholder="Any additional details"
                    defaultValue={details}
                />
                {errors.details && (
                    <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
                )}
                <div className='text-center'>
                    <button
                        type="submit"
                        className="bg-white text-black py-2 w-[50%] rounded mt-4 font-bold cursor-pointer "
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPost
