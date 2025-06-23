import React, { useState } from 'react'
import useSinglePostById from '../../../Hooks/useSinglePostById';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useUser from '../../../Hooks/useUser';
import CommentWorks from './CommentWorks/CommentWorks';
import Loading from '../../Loading/Loading';
import { Head, useHead } from '@unhead/react';

const SinglePostPage = () => {
    useHead({
        title: 'Roadmap App',
        meta: [
            { name: 'description', content: 'My awesome site description' }
        ]
    })
    const axiosPublic = useAxiosPublic();
    const [userData] = useUser()
    const [singlePostData, isLoading, refetch] = useSinglePostById()
    const [openInput, setOpenInput] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const commentInfo = {
            comment: data.comment,
            userEmail: userData?.email,
            userName: userData?.name,
        }
        await axiosPublic.patch(`/posts/add-comment/${singlePostData?._id}`, { commentInfo })
        refetch()
        reset();
        setOpenInput(false);
    }

    const handleCommentInput = () => {
        setOpenInput(true);
    }




    if (isLoading) return <Loading />
    return (
        <>
            <Head>
                <title>Post details</title>
                {/* <meta name="description" content="My awesome site description" /> */}
            </Head>

            <div className='max-w-[80vw] mx-auto min-h-screen mt-14'>
                <div className='border border-black/20 rounded-lg py-5 px-2'>
                    <h1 className='text-2xl font-semibold'>{singlePostData?.title}</h1>
                    <h3 className='text-sm text-gray-600 '>{singlePostData?.name}</h3>
                    {/* {singlePostData?.time} */}
                    <h4 className='text-sm text-gray-600 '>Posted at: 3:00 PM</h4>
                    <div className='mt-4 border border-black/20 rounded-lg py-5 px-2'>
                        <p>{singlePostData?.details}</p>
                    </div>
                    <div className='flex gap-4 items-center mt-4'>
                        <button className='bg-black/90 text-white px-10 py-2 rounded-lg cursor-pointer '>Like ({singlePostData?.likes?.length})</button>
                        <button
                            onClick={handleCommentInput}
                            className='bg-black/90 text-white px-10 py-2 rounded-lg cursor-pointer '>
                            Comment
                        </button>
                    </div>

                </div>
                <div>
                    {openInput && (
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
                                className="cursor-pointer border-2 bg-white text-black py-2 px-4 rounded mt-4 font-bold">
                                Submit
                            </button>
                        </form>)}
                </div>


                {/* Comment update and Delete part is in CommentWorks component */}
                <div>
                    <CommentWorks singlePostData={singlePostData} refetch={refetch} />
                </div>

            </div>
        </>
    )
}

export default SinglePostPage
