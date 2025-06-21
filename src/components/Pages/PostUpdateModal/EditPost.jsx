import React from 'react'
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const EditPost = ({ postData, onSuccess }) => {
    const axiosPublic = useAxiosPublic();
    const { title, details, name } = postData;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log("From edited", data);
        const updateInfo = {
            title: data.title,
            details: data.details,
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
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Author*</label>
                <input
                    type="text"
                    defaultValue={name}
                    {...register('name')}
                    className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                    readOnly
                />
                {/* {errors.name && <p className="text-red-500">{errors.name.message}</p>} */}
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title *</label>
                <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                    placeholder="Short, Descriptive title"
                    defaultValue={title}
                    required
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 ">Details</label>
                <textarea
                    {...register('details', { maxLength: { value: 300, message: "Details cannot exceed 300 characters", } })}

                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                    placeholder="Any additional details"
                    defaultValue={details}
                />
                {errors.details && (
                    <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-white text-black py-2 px-4 rounded mt-4 font-bold"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default EditPost
