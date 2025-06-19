import React from 'react'
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useUser from '../../../Hooks/useUser';

const AddComment = () => {
    const [userData] = useUser()
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 ">Comment section</label>
                <textarea
                    {...register('comment', { maxLength: { value: 300, message: "comment cannot exceed 300 characters", } })}

                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black/20 rounded-md"
                    placeholder="Leave a comment"
                />
                {errors.comment && (
                    <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
                )}

                <button
                    type="submit"
                    className="cursor-pointer border-2 bg-white text-black py-2 px-4 rounded mt-4 font-bold"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddComment
