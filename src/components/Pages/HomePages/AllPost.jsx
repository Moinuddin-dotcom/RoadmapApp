import React, { useState } from 'react'
import useAllPost from '../../../Hooks/useAllPost'
import { BiUpvote } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import useUser from '../../../Hooks/useUser'
import useRole from '../../../Hooks/useRole'
import Modal from '../PostUpdateModal/Modal'
import Swal from 'sweetalert2'
import Loading from '../../Loading/Loading'

const AllPost = () => {

    const axiosPublic = useAxiosPublic()
    const [userData] = useUser()
    const [role] = useRole()
    const [selectedPostId, setSelectedPostId] = useState(null);

    const [category, setCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const [allPost, refetch, isLoading] = useAllPost({ category, sortOrder })
    // console.log('allPost in UI:', allPost.map(post => ({ title: post.title, likes: post.likes?.length || 0 })));


    const handleLike = async (id) => {
        console.log('Clicked Like', id)
        if (!userData?.email) return
        try {
            const { data } = await axiosPublic.patch(`/posts/like/${id}`, { userEmail: userData?.email })
            refetch()
            console.log(data)
        } catch (err) {
            console.log(err)
        }

    }

    const handleEdit = (id) => {
        console.log("Edit ID:", id)
        setSelectedPostId(id);
    }

    const handleDelete = async (id) => {
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
                const { data } = await axiosPublic.delete(`/post/delete-single-post/${id}`)
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }



    const closeModal = () => {
        setSelectedPostId(null);
    };

    if (isLoading) return <Loading />


    return (
        <>
            {/* Filtering */}
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-6'>
                <div className="flex items-center gap-2">
                    <label htmlFor="category">Filter by Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 rounded text-sm w-full sm:w-auto"
                    >
                        <option value="">Select one</option>
                        <option value="TO DO">TO DO</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold">Sort by Likes:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">None</option>
                        <option value="asc">Likes (Ascending)</option>
                        <option value="desc">Likes (Descending)</option>
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-center '>

                {
                    allPost?.map(postData =>
                        <div key={postData._id} className='border border-gray-600 rounded-lg py-5 px-2'>
                            <div className='flex gap-4 items-center'>
                                <div className="like border border-blue-200 py-3 px-3 rounded-lg">
                                    <button
                                        onClick={() => handleLike(postData._id)}
                                        className='flex justify-center items-center gap-1.5 cursor-pointer'><BiUpvote className='text-blue-500 text-lg' />({postData?.likes?.length})</button>
                                </div>
                                <div className="title-cat">
                                    <Link className="text-xl font-semibold mt-3" to={`/post/single-post-page/${postData._id}`}>{postData?.title}</Link>
                                    <h2 ></h2>
                                    <h3 className="text-md text-blue-500 font-semibold mb-4">{ }({postData?.category})</h3>
                                </div>
                            </div>
                            < div >
                                <div className="name">
                                    <span className='text-md font-semibold text-violet-950 hover:bg-gray-200 py-1 px-2 rounded-lg cursor-pointer'>{postData?.name}</span>
                                    <div className='wrap-anywhere'>{postData?.details}</div>
                                    <div className='flex gap-2 items-center '>
                                        {
                                            role === 'admin' && <>
                                                <p onClick={() => handleEdit(postData._id)} className='text-sm text-gray-500 hover:text-black cursor-pointer'>Edit Post</p>
                                                <p className='text-sm text-black' >|</p>
                                                <p onClick={() => handleDelete(postData._id)} className='text-sm text-gray-500 hover:text-black cursor-pointer'>Delete Post</p>
                                                <p className='text-sm text-black' >|</p>
                                            </>
                                        }
                                        <Link to={`/post/single-post-page/${postData._id}`}>
                                            <p
                                                //  onClick={() => handleAddComment(postData._id)}
                                                className='text-sm text-gray-500 hover:text-black cursor-pointer'>Add Comment</p>
                                        </Link>
                                        {/* <p className='text-sm text-black' >|</p>
                                    <p onClick={() => handleEdit(postData._id)} className='text-sm text-gray-500 hover:text-black cursor-pointer'>See all comment</p> */}
                                    </div>
                                </div>
                            </div >

                        </div>
                    )}
                {/* Modal */}
                {selectedPostId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white/5 border border-white text-white p-6 rounded-lg w-[90%] max-w-6xl shadow-lg 
                        relative">
                            <Modal id={selectedPostId} onSuccess={() => { refetch(); closeModal(); }} />
                            {/* Close button */}
                            <div className='text-center'>
                                <button
                                    onClick={closeModal}
                                    className="border border-white bg-black hover:bg-red-600 text-white py-2 w-[50%] rounded font-bold cursor-pointer mt-5">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AllPost


