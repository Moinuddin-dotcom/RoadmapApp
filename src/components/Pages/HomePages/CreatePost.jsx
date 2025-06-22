import React, { useState } from 'react'
import PostFrom from './PostFrom';

const CreatePost = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='text-center'>
            {/* <Link to={'/createPostPage'}>
                <button className='bg-black/90 text-white px-10 py-2 rounded-lg cursor-pointer '>Create Post</button>
            </Link> */}
            <div className="p-6">
                {/* Button to open Modal */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-black/90 text-white px-10 py-2 rounded-lg cursor-pointer"
                >
                    Create Post
                </button>

                {/* Modal */}
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white/5 border border-white text-white p-6 rounded-lg w-[90%] max-w-6xl shadow-lg 
                        relative">
                            <PostFrom />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="border border-white bg-black hover:bg-red-600 text-white py-2 w-[50%] rounded font-bold cursor-pointer mt-5">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreatePost
