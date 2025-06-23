import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { BiEdit } from 'react-icons/bi'
import { FiDelete } from 'react-icons/fi'
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const CommentWorks = ({ singlePostData, refetch }) => {

    const [editingCommentId, setEditingCommentId] = useState(null);
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    const handleEditClick = (cmnt) => {
        setEditingCommentId(cmnt._id);
        setValue("comment", cmnt?.commentInfo?.commentInfo?.comment);
    };

    const onSubmit = async (data) => {
        try {
            await axiosPublic.patch(`/post/update-comment/${singlePostData?._id}/${editingCommentId}`, {
                comment: data.comment,
            });
            setEditingCommentId(null);
            reset();
            refetch();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (cmnt) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosPublic.delete(`/post/delete-comment/${singlePostData?._id}/${cmnt._id}`)
                if (data.deletedCount > 0) {

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                }
                refetch();
            }
        });
    }


    return (
        <div className='mt-4'>
            {singlePostData?.comments?.map((cmnt) => (
                <div key={cmnt._id} className='border border-black/20 rounded-lg py-1 px-2 mt-1 ml-10'>
                    <p className='text-sm text-gray-600 font-bold'>{cmnt?.commentInfo?.commentInfo?.userName}</p>

                    {editingCommentId === cmnt._id ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-2">
                            <textarea
                                {...register('comment', {
                                    required: "Comment is required",
                                    maxLength: { value: 300, message: "Cannot exceed 300 characters" }
                                })}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white text-black"
                                placeholder="Update comment"
                            />
                            {errors.comment && (
                                <p className="text-red-500 text-xs">{errors.comment.message}</p>
                            )}
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingCommentId(null)}
                                    className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <p className='text-lg text-gray-800'>- {cmnt?.commentInfo?.commentInfo?.comment}</p>
                            <div className='flex gap-2 items-center mt-5'>
                                {/* <button
                                    onClick={() => handleEditClick(cmnt)}
                                    className='flex items-center gap-1 bg-black/90 text-white text-sm px-2 py-1 rounded-lg cursor-pointer'
                                >
                                    <BiEdit className='text-blue-400 ' /> Edit
                                </button> */}
                                <p onClick={() => handleEditClick(cmnt)} className='flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 cursor-pointer font-semibold'><BiEdit className='text-blue-400' /> Edit</p>

                                {/* <button
                                    onClick={() => handleDelete(cmnt)}
                                    className='flex items-center gap-1 bg-black/90 text-white text-sm px-2 py-1 rounded-lg'
                                >
                                    <FiDelete className='text-red-500' /> Delete
                                </button> */}
                                <p className='text-sm text-black' >|</p>
                                <p onClick={() => handleDelete(cmnt)} className='flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 cursor-pointer font-semibold'> <FiDelete className='text-red-500' /> Delete</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CommentWorks
